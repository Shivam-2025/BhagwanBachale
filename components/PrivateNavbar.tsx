import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
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

  const menuItems = [
    { view: "dashboard", icon: "📊", label: "Dashboard" },
    { view: "profile", icon: "👤", label: "Profile" },
    { view: "recording", icon: "📹", label: "Record" },
    { view: "leaderboard", icon: "🏆", label: "Leaderboard" },
    { view: "achievements", icon: "🏅", label: "Badges" },
  ];

  const handleLogoClick = () => {
    onNavigate("dashboard");
  };

  return (
    <>
      {/* Top Navbar */}
      <View style={styles.navbar}>
        {/* Logo */}
        <TouchableOpacity style={styles.logoContainer} onPress={handleLogoClick}>
          <View style={styles.logoIcon}>
            <Icon name="sports-soccer" size={20} color="#fff" />
          </View>
          <View>
            <Text style={styles.logoTitle}>KhelSaksham</Text>
            <Text style={styles.logoSubtitle}>खेळ सक्षम</Text>
          </View>
        </TouchableOpacity>

        {/* Menu Buttons */}
        <View style={styles.menuRow}>
          {menuItems.map(({ view, icon, label }) => (
            <TouchableOpacity
              key={view}
              style={[
                styles.menuButton,
                currentView === view && styles.menuButtonActive,
              ]}
              onPress={() => onNavigate(view)}
            >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text
                style={[
                  styles.menuText,
                  currentView === view && styles.menuTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>🚪 Logout</Text>
        </TouchableOpacity>

        {/* Hamburger (mobile) */}
        <TouchableOpacity
          style={styles.hamburger}
          onPress={() => setSidebarOpen(true)}
        >
          <Icon name="menu" size={28} color="#334155" />
        </TouchableOpacity>
      </View>

      {/* Sidebar (mobile) */}
      <Modal visible={sidebarOpen} animationType="slide" transparent>
        <Pressable
          style={styles.overlay}
          onPress={() => setSidebarOpen(false)}
        />
        <View style={styles.sidebar}>
          <Text style={styles.sidebarTitle}>📊 Menu</Text>
          {menuItems.map(({ view, icon, label }) => (
            <TouchableOpacity
              key={view}
              style={[
                styles.sidebarItem,
                currentView === view && styles.sidebarItemActive,
              ]}
              onPress={() => {
                onNavigate(view);
                setSidebarOpen(false);
              }}
            >
              <Text style={styles.menuIcon}>{icon}</Text>
              <Text style={styles.sidebarText}>{label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.sidebarItem, { marginTop: "auto" }]}
            onPress={() => {
              onLogout();
              setSidebarOpen(false);
            }}
          >
            <Text style={styles.logoutText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
  menuRow: {
    flexDirection: "row",
    marginLeft: 20,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  menuButtonActive: {
    backgroundColor: "#2563eb",
  },
  menuIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  menuText: {
    fontSize: 14,
    color: "#334155",
  },
  menuTextActive: {
    color: "white",
    fontWeight: "bold",
  },
  logoutBtn: {
    marginLeft: "auto",
  },
  logoutText: {
    color: "#dc2626",
    fontWeight: "600",
  },
  hamburger: {
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 240,
    height: "100%",
    backgroundColor: "white",
    padding: 20,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  sidebarItemActive: {
    backgroundColor: "#2563eb",
  },
  sidebarText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#334155",
  },
});
