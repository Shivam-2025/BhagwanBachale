import { useEffect, useRef, useState } from "react";

export function usePushupCounter() {
  const [count, setCount] = useState(0);
  const netRef = useRef<any | null>(null);
  const goingDownRef = useRef(false);

  useEffect(() => {
    const init = async () => {
      // Only initialize in browser environment
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        try {
          // Dynamic imports to avoid SSR issues
          const posenet = await import("@tensorflow-models/posenet");
          const tf = await import("@tensorflow/tfjs");
          await import("@tensorflow/tfjs-react-native");
          
          // 1️⃣ Prepare TensorFlow JS
          await tf.ready();
          await tf.setBackend("rn-webgl"); // RN GPU backend
          console.log("✅ TensorFlow ready with rn-webgl backend");

          // 2️⃣ Load PoseNet model
          const net = await posenet.load({
            architecture: "MobileNetV1",
            outputStride: 16,
            inputResolution: { width: 257, height: 257 },
            multiplier: 0.75,
          });

          netRef.current = net;
          console.log("✅ PoseNet loaded");
        } catch (error) {
          console.warn("PoseNet initialization failed:", error);
        }
      }
    };

    init();
  }, []);

  // 3️⃣ Detect push-ups from camera frame or tensor
  const detect = async (input: any) => {
    if (!netRef.current) return;

    const pose = await netRef.current.estimateSinglePose(input, {
      flipHorizontal: false,
    });

    if (!pose.keypoints.length) return;

    const shoulder = pose.keypoints[5];
    const elbow = pose.keypoints[7];
    const wrist = pose.keypoints[9];

    if (shoulder && elbow && wrist) {
      const angle = getAngle(shoulder, elbow, wrist);

      if (angle < 90) goingDownRef.current = true;
      if (angle > 160 && goingDownRef.current) {
        setCount((c) => c + 1);
        goingDownRef.current = false;
      }
    }
  };

  const reset = () => setCount(0);

  return { count, detect, reset };
}

// 4️⃣ Helper: calculate elbow angle
function getAngle(a: any, b: any, c: any) {
  const AB = Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
  const BC = Math.sqrt((b.x - c.x) ** 2 + (b.y - c.y) ** 2);
  const AC = Math.sqrt((c.x - a.x) ** 2 + (c.y - a.y) ** 2);
  return (Math.acos((AB ** 2 + BC ** 2 - AC ** 2) / (2 * AB * BC)) * 180) / Math.PI;
}
