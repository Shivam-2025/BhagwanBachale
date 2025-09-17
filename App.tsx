import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import Screens
import PublicNavbar from "./components/PublicNavbar";
import PrivateNavbar from "./components/PrivateNavbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Recording from "./components/Recording";
import Leaderboard from "./components/Leaderboard";
import Achievements from "./components/Achievements";
import AuthForm from "./components/Auth";

// Types
type AppView =
  | "home"
  | "dashboard"
  | "profile"
  | "recording"
  | "leaderboard"
  | "achievements"
  | "auth";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function KhelSakshamApp() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = await AsyncStorage.getItem("khelsaksham_user");
      if (mockUser) {
        setUser(JSON.parse(mockUser));
        setCurrentView("dashboard");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleAuthSuccess = async () => {
    const mockUser: User = {
      id: "1",
      name: "Arjun Sharma",
      email: "arjun@example.com",
      avatar: "https://i.pravatar.cc/400?u=arjun",
    };
    setUser(mockUser);
    await AsyncStorage.setItem("khelsaksham_user", JSON.stringify(mockUser));
    setCurrentView("dashboard");
  };

  const handleLogout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("khelsaksham_user");
    setCurrentView("home");
  };

  const handleNavigation = (view: AppView) => {
    if (view === "auth" || (user && view !== "home")) {
      setCurrentView(view);
    } else if (!user && view !== "home") {
      setCurrentView("auth");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loaderText}>KhelSaksham</Text>
        <Text style={styles.loaderSubText}>
          खेळ सक्षम - Loading your athletic journey...
        </Text>
      </View>
    );
  }

  if (currentView === "auth") {
    return (
      <AuthForm
        onAuthSuccess={handleAuthSuccess}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  return (
    <View style={styles.container}>
      {!user && (
        <PublicNavbar
          onLoginClick={() => setCurrentView("auth")}
          onSignupClick={() => setCurrentView("auth")}
        />
      )}

      <ScrollView style={styles.content}>
        {currentView === "home" && (
          <>
            <Hero onExplore={() => setCurrentView("auth")} />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Ready to Discover Your Athletic Potential?
              </Text>
              <Text style={styles.sectionSubtitle}>
                Join thousands of Indian athletes already using KhelSaksham
              </Text>

              <View style={styles.features}>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>🎥</Text>
                  <Text style={styles.featureTitle}>
                    Record Your Assessment
                  </Text>
                  <Text style={styles.featureText}>
                    Capture your skills easily with your phone.
                  </Text>
                </View>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>📊</Text>
                  <Text style={styles.featureTitle}>
                    Get Your Performance Scores
                  </Text>
                  <Text style={styles.featureText}>
                    AI-powered insights to improve your game.
                  </Text>
                </View>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>🏆</Text>
                  <Text style={styles.featureTitle}>Compete Nationally</Text>
                  <Text style={styles.featureText}>
                    Compare and rank yourself with athletes across India.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => setCurrentView("auth")}
              >
                <Text style={styles.ctaText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {currentView === "dashboard" && <Dashboard />}
        {currentView === "profile" && <Profile />}
        {currentView === "recording" && <Recording />}
        {currentView === "leaderboard" && <Leaderboard />}
        {currentView === "achievements" && <Achievements />}
      </ScrollView>

      {user && (
        <PrivateNavbar
          currentView={currentView}
          onNavigate={(view: string) => handleNavigation(view as AppView)}
          onLogout={handleLogout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    color: "#1e293b",
  },
  loaderSubText: {
    color: "#475569",
    marginTop: 4,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: "#2563eb",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#bfdbfe",
    textAlign: "center",
    marginBottom: 20,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  featureCard: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  featureText: {
    fontSize: 12,
    color: "#e0f2fe",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
  },
  ctaText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 16,
  },
});
// App.tsx
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import KhelSakshamApp from "./app/tabs"; // path to your KhelSakshamApp file

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KhelSakshamApp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import Screens
import PublicNavbar from "./components/PublicNavbar";
import PrivateNavbar from "./components/PrivateNavbar";
import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Recording from "./components/Recording";
import Leaderboard from "./components/Leaderboard";
import Achievements from "./components/Achievements";
import AuthForm from "./components/Auth";

// Types
type AppView =
  | "home"
  | "dashboard"
  | "profile"
  | "recording"
  | "leaderboard"
  | "achievements"
  | "auth";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export default function KhelSakshamApp() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser = await AsyncStorage.getItem("khelsaksham_user");
      if (mockUser) {
        setUser(JSON.parse(mockUser));
        setCurrentView("dashboard");
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const handleAuthSuccess = async () => {
    const mockUser: User = {
      id: "1",
      name: "Arjun Sharma",
      email: "arjun@example.com",
      avatar: "https://i.pravatar.cc/400?u=arjun",
    };
    setUser(mockUser);
    await AsyncStorage.setItem("khelsaksham_user", JSON.stringify(mockUser));
    setCurrentView("dashboard");
  };

  const handleLogout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("khelsaksham_user");
    setCurrentView("home");
  };

  const handleNavigation = (view: AppView) => {
    if (view === "auth" || (user && view !== "home")) {
      setCurrentView(view);
    } else if (!user && view !== "home") {
      setCurrentView("auth");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loaderText}>KhelSaksham</Text>
        <Text style={styles.loaderSubText}>
          खेळ सक्षम - Loading your athletic journey...
        </Text>
      </View>
    );
  }

  if (currentView === "auth") {
    return (
      <AuthForm
        onAuthSuccess={handleAuthSuccess}
        onBack={() => setCurrentView("home")}
      />
    );
  }

  return (
    <View style={styles.container}>
      {!user && (
        <PublicNavbar
          onLoginClick={() => setCurrentView("auth")}
          onSignupClick={() => setCurrentView("auth")}
        />
      )}

      <ScrollView style={styles.content}>
        {currentView === "home" && (
          <>
            <Hero onExplore={() => setCurrentView("auth")} />
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Ready to Discover Your Athletic Potential?
              </Text>
              <Text style={styles.sectionSubtitle}>
                Join thousands of Indian athletes already using KhelSaksham
              </Text>

              <View style={styles.features}>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>🎥</Text>
                  <Text style={styles.featureTitle}>
                    Record Your Assessment
                  </Text>
                  <Text style={styles.featureText}>
                    Capture your skills easily with your phone.
                  </Text>
                </View>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>📊</Text>
                  <Text style={styles.featureTitle}>
                    Get Your Performance Scores
                  </Text>
                  <Text style={styles.featureText}>
                    AI-powered insights to improve your game.
                  </Text>
                </View>
                <View style={styles.featureCard}>
                  <Text style={styles.featureIcon}>🏆</Text>
                  <Text style={styles.featureTitle}>Compete Nationally</Text>
                  <Text style={styles.featureText}>
                    Compare and rank yourself with athletes across India.
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.ctaButton}
                onPress={() => setCurrentView("auth")}
              >
                <Text style={styles.ctaText}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {currentView === "dashboard" && <Dashboard />}
        {currentView === "profile" && <Profile />}
        {currentView === "recording" && <Recording />}
        {currentView === "leaderboard" && <Leaderboard />}
        {currentView === "achievements" && <Achievements />}
      </ScrollView>

      {user && (
        <PrivateNavbar
          currentView={currentView}
          onNavigate={(view: string) => handleNavigation(view as AppView)}
          onLogout={handleLogout}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loaderText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
    color: "#1e293b",
  },
  loaderSubText: {
    color: "#475569",
    marginTop: 4,
    textAlign: "center",
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    backgroundColor: "#2563eb",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#bfdbfe",
    textAlign: "center",
    marginBottom: 20,
  },
  features: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  featureCard: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  featureText: {
    fontSize: 12,
    color: "#e0f2fe",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: "center",
  },
  ctaText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 16,
  },
});
