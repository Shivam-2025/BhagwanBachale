import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";

type Exercise = "pushups" | "situps" | "jump" | "pullups";
type RecordingState = "idle" | "recording" | "preview" | "uploading" | "success";

// ✅ format timer (MM:SS)
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

export default function RecordingScreen() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise>("pushups");
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // 🕒 Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recordingState === "recording") {
      setRecordingTime(0);
      interval = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recordingState]);

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  const handleRecord = () => {
    if (recordingState === "idle") {
      setRecordingState("recording");
    } else if (recordingState === "recording") {
      setRecordingState("preview");
    } else if (recordingState === "preview") {
      setRecordingState("uploading");
      setTimeout(() => setRecordingState("success"), 2000);
      setTimeout(() => setRecordingState("idle"), 4000);
    }
  };

  return (
    <View style={styles.container}>
      {/* ... exercise selector (same as before) ... */}

      {/* Camera + Overlays */}
      <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} type="front" />

        {/* ✅ Timer overlay */}
        {recordingState === "recording" && (
          <View style={styles.timer}>
            <View style={styles.timerDot} />
            <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
          </View>
        )}

        {/* (keep AICounter + CheatAlert here) */}
      </View>

      {/* Record button (same as before) */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
  cameraWrapper: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "black",
  },
  camera: { flex: 1 },

  // ✅ Timer styles
  timer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(220,38,38,0.9)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  timerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
    marginRight: 6,
  },
  timerText: {
    color: "white",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontSize: 14,
  },
});
