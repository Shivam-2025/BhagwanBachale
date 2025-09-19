import { useColorScheme } from "@/hooks/use-color-scheme";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View, Platform } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // TensorFlow setup on mount - only in browser environment
  useEffect(() => {
    const prepare = async () => {
      // Check if we're in a browser environment where navigator is available
      if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
        try {
          // Dynamic import to avoid SSR issues
          const tf = await import("@tensorflow/tfjs");
          await import("@tensorflow/tfjs-react-native");
          await tf.ready();
          console.log("✅ TensorFlow is ready");
        } catch (error) {
          console.warn("TensorFlow initialization failed:", error);
        }
      }
    };
    prepare();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="modal"
            options={{ presentation: "modal", title: "Modal" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

// Expo Router unstable settings
export const unstable_settings = {
  anchor: "(tabs)",
};
