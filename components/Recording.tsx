import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, Camera } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePushupCounter } from "../ai/usePushupCounter";
import { useRecorder } from "../hooks/useRecorder";

type ExerciseId = "pushups" | "situps" | "jump" | "pullups";

interface Exercise {
  id: ExerciseId;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  description: string;
}

const EXERCISES: Exercise[] = [
  { id: "pushups", icon: "weight-lifter", title: "Push-ups", description: "Record continuous push-ups" },
  { id: "situps", icon: "seat", title: "Sit-ups", description: "Record abdominal crunches" },
  { id: "jump", icon: "run-fast", title: "Vertical Jump", description: "Record maximum jump height" },
  { id: "pullups", icon: "arm-flex", title: "Pull-ups", description: "Record upper body strength" },
];

const AICounter = ({ count }: { count: number }) => (
  <View style={styles.counterBox}>
    <Text style={styles.counterLabel}>Push-ups Detected</Text>
    <Text style={styles.counterValue}>{count}</Text>
  </View>
);

const IdleCameraView = () => (
  <View style={styles.idleContainer}>
    <MaterialCommunityIcons name="dumbbell" size={36} color="#475569" />
    <Text style={styles.idleTitle}>Ready to Record Push-ups</Text>
    <Text style={styles.idleSubtitle}>Position yourself in frame and tap record</Text>
  </View>
);

export default function RecordingScreen() {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseId>("pushups");
  const { cameraRef, videoUri, isRecording, startRecording, stopRecording } = useRecorder();
  const { count, detect, reset } = usePushupCounter();
  const [permission, setPermission] = useState<boolean | null>(null);

  // --- Camera tensor ref
  const [textureDims, setTextureDims] = useState({ width: 1920, height: 1080 });
  const [cameraTensorRef, setCameraTensorRef] = useState<any>(null);

  // CAMERA PERMISSION
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: microphoneStatus } = await Camera.requestMicrophonePermissionsAsync();
      setPermission(cameraStatus === "granted" && microphoneStatus === "granted");

      // Initialize TensorFlow only in browser environment
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        try {
          const tf = await import("@tensorflow/tfjs");
          await import("@tensorflow/tfjs-react-native");
          await tf.ready();
          console.log("✅ TensorFlow ready for React Native");
        } catch (error) {
          console.warn("TensorFlow initialization failed:", error);
        }
      }
    })();
  }, []);

  // Pose detection loop
  useEffect(() => {
    let animationFrame: number | null = null;

    const loop = async () => {
      if (isRecording && cameraTensorRef) {
        const nextFrame = await cameraTensorRef.takePictureAsync({ skipProcessing: true });
        await detect(nextFrame);
        animationFrame = requestAnimationFrame(loop);
      }
    };

    if (isRecording) loop();
    else if (animationFrame !== null) cancelAnimationFrame(animationFrame);

    return () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, [isRecording, cameraTensorRef]);

  const handleRecordPress = async () => {
    if (!isRecording) {
      reset();
      await startRecording();
    } else {
      stopRecording();
    }
  };

  const handleRetake = () => reset();
  const handleUpload = () => Alert.alert("Upload", `Uploading video: ${videoUri}`);

  if (permission === null)
    return <View style={styles.centered}><Text>Checking permissions...</Text></View>;
  if (!permission)
    return <View style={styles.centered}><Text>No camera access</Text></View>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Recording Studio</Text>
      <Text style={styles.subHeading}>Record your athletic performance for AI-powered assessment</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.exerciseCard}>
          <Text style={styles.cardTitle}>Select Exercise</Text>
          {EXERCISES.map((ex) => {
            const isActive = selectedExercise === ex.id;
            return (
              <TouchableOpacity key={ex.id} style={[styles.exerciseButton, isActive && styles.exerciseButtonActive]} onPress={() => setSelectedExercise(ex.id)}>
                <View style={[styles.iconContainer, isActive && styles.iconContainerActive]}>
                  <MaterialCommunityIcons name={ex.icon} size={22} color={isActive ? "#3B82F6" : "#64748B"} />
                </View>
                <View style={{ flexShrink: 1 }}>
                  <Text style={[styles.exerciseTitle, isActive && styles.exerciseTitleActive]}>{ex.title}</Text>
                  <Text style={styles.exerciseDescription}>{ex.description}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef as any} // cast to any
            style={styles.camera}
            facing="front"
            onCameraReady={async () => {
              if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
                try {
                  const { cameraWithTensors } = await import("@tensorflow/tfjs-react-native");
                  const TensorCamera = cameraWithTensors(CameraView as any);
                  setCameraTensorRef(TensorCamera);
                } catch (error) {
                  console.warn("Failed to initialize tensor camera:", error);
                }
              }
            }}
          />

          {isRecording ? <AICounter count={count} /> : <IdleCameraView />}

          {videoUri && !isRecording ? (
            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity style={[styles.recordButton, { backgroundColor: "#F59E0B" }]} onPress={handleRetake}>
                <Text style={styles.recordButtonText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.recordButton, { backgroundColor: "#10B981" }]} onPress={handleUpload}>
                <Text style={styles.recordButtonText}>Upload</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.recordButton} onPress={handleRecordPress}>
              <View style={isRecording ? styles.stopIcon : styles.recordIcon} />
              <Text style={styles.recordButtonText}>{isRecording ? "Stop" : "Record"}</Text>
            </TouchableOpacity>
          )}
        </View>

        {videoUri && <Text style={styles.statusText}>Video saved at: {videoUri}</Text>}
        <Text style={styles.statusText}>Status: {isRecording ? "recording" : "idle"}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}


// --- STYLES ---
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#F7F8FA", paddingHorizontal: 16 },
  heading: { fontSize: 24, fontWeight: "bold", color: "#1E293B", marginTop: 16 },
  subHeading: { fontSize: 14, color: "#64748B", marginBottom: 16 },
  scrollContainer: { paddingBottom: 32 },
  exerciseCard: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#E2E8F0" },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#334155", marginBottom: 12 },
  exerciseButton: { flexDirection: "row", alignItems: "center", padding: 10, borderRadius: 8, marginVertical: 4 },
  exerciseButtonActive: { backgroundColor: "#EFF6FF", borderColor: "#3B82F6", borderWidth: 1 },
  iconContainer: { width: 36, height: 36, borderRadius: 8, backgroundColor: "#F1F5F9", justifyContent: "center", alignItems: "center", marginRight: 10 },
  iconContainerActive: { backgroundColor: "#DBEAFE" },
  exerciseTitle: { fontSize: 14, fontWeight: "500", color: "#334155" },
  exerciseTitleActive: { color: "#1E3A8A" },
  exerciseDescription: { fontSize: 12, color: "#64748B", marginTop: 2 },
  cameraContainer: { height: 400, backgroundColor: "#020617", borderRadius: 16, justifyContent: "center", alignItems: "center", marginBottom: 24, overflow: "hidden" },
  camera: { ...StyleSheet.absoluteFillObject },
  statusText: { fontSize: 13, color: "#475569", marginTop: 4 },
  counterBox: { position: "absolute", top: 12, left: 12, backgroundColor: "rgba(0,0,0,0.5)", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  counterLabel: { color: "#E2E8F0", fontSize: 12 },
  counterValue: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  idleContainer: { justifyContent: "center", alignItems: "center", padding: 12 },
  idleTitle: { color: "#fff", fontSize: 18, fontWeight: "600", marginTop: 12 },
  idleSubtitle: { color: "#94A3B8", fontSize: 12, marginTop: 4, textAlign: "center" },
  recordButton: { position: "absolute", bottom: 16, backgroundColor: "#EF4444", width: 100, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 6 },
  recordButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  recordIcon: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#fff" },
  stopIcon: { width: 10, height: 10, borderRadius: 2, backgroundColor: "#fff" },
});
