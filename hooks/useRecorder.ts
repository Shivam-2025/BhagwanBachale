import { CameraView } from "expo-camera";
import { useRef, useState } from "react";

export function useRecorder() {
  const cameraRef = useRef<any | null>(null);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    if (!cameraRef.current) return;
    setIsRecording(true);
    try {
      const video = await cameraRef.current.recordAsync();
      setVideoUri(video.uri);
      setIsRecording(false);
    } catch (err) {
      console.error("Recording error:", err);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  return { cameraRef, videoUri, isRecording, startRecording, stopRecording };
}
