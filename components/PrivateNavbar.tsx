import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface PrivateNavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export default function PrivateNavbar({
  currentView,
  onNavigate,
  onLogout,
}: PrivateNavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-260)).current; // hidden at start

  const menuItems = [
    { view: "dashboard", icon: "📊", label: "Dashboard" },
    { view: "profile", icon: "👤", label: "Profile" },
    { view: "leaderboard", icon: "🏆", label: "Leaderboard" },
    { view: "achievements", icon: "🏅", label: "Achievements" },
    { view: "recording", icon: "📹", label: "Record" },
  ];

  // ✅ Toggle sidebar
  const toggleSidebar = () => {
    if (sidebarOpen) {
      // close
      Animated.timing(slideAnim, {
        toValue: -260,
        duration: 250,
        useNativeDriver: false,
      }).start(() => setSidebarOpen(false));
    } else {
      // open
      setSidebarOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  };

  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: -260,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setSidebarOpen(false));
  };

  return (
    <>
      {/* Top Navbar */}
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.navbar}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Icon name="sports-soccer" size={20} color="#fff" />
            </View>
            <View>
              <Text style={styles.logoTitle}>KhelSaksham</Text>
              <Text style={styles.logoSubtitle}>खेळ सक्षम</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.hamburger} onPress={toggleSidebar}>
            <Icon name="menu" size={28} color="#334155" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Sidebar */}
      {sidebarOpen && (
        <>
          <Pressable style={styles.overlay} onPress={closeSidebar} />
          <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
            <Text style={styles.sidebarTitle}>📋 Menu</Text>

            {menuItems.map(({ view, icon, label }) => (
              <TouchableOpacity
                key={view}
                style={[
                  styles.sidebarItem,
                  currentView === view && styles.sidebarItemActive,
                ]}
                onPress={() => {
                  onNavigate(view);
                  closeSidebar();
                }}
              >
                <Text style={styles.sidebarIcon}>{icon}</Text>
                <Text
                  style={[
                    styles.sidebarText,
                    currentView === view && styles.sidebarTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.sidebarItem, { marginTop: "auto" }]}
              onPress={() => {
                onLogout();
                closeSidebar();
              }}
            >
              <Text style={styles.sidebarIcon}>🚪</Text>
              <Text style={[styles.sidebarText, { color: "#dc2626" }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "rgba(255,255,255,0.95)",
    zIndex: 1000,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    position: "relative",
    zIndex: 1000,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1e293b",
  },
  logoSubtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  hamburger: {
    padding: 6,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 900,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    width: 260,
    height: "100%",
    backgroundColor: "white",
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 6,
    zIndex: 1000,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1e293b",
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  sidebarItemActive: {
    backgroundColor: "#dbeafe",
  },
  sidebarIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  sidebarText: {
    fontSize: 15,
    color: "#334155",
  },
  sidebarTextActive: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
