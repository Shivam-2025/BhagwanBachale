import { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface PublicNavbarProps {
  onLoginClick?: () => void;
  onSignupClick?: () => void;
  onNavigate?: (view: string) => void;
}

export default function PublicNavbar({
  onLoginClick,
  onSignupClick,
  onNavigate,
}: PublicNavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(
    Dimensions.get("window").width < 500
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(Dimensions.get("window").width < 500);
    };
    const sub = Dimensions.addEventListener("change", handleResize);
    return () => sub.remove();
  }, []);

  const handleLogoClick = () => {
    if (onNavigate) {
      onNavigate("home");
    }
  };

  return (
    <View style={styles.navbar}>
      {/* Left: Logo */}
      <TouchableOpacity style={styles.logoContainer} onPress={handleLogoClick}>
        <View style={styles.logoIcon}>
          <Icon name="sports-soccer" size={20} color="#fff" />
        </View>
        <View>
          <Text style={styles.logoTitle}>KhelSaksham</Text>
          <Text style={styles.logoSubtitle}>खेळ सक्षम</Text>
        </View>
      </TouchableOpacity>

      {/* Right side */}
      {!isSmallScreen ? (
        // ✅ Large screen: show buttons inline
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.loginBtn} onPress={onLoginClick}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn} onPress={onSignupClick}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // ✅ Small screen: show menu icon
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? "close" : "menu"} size={24} color="#334155" />
        </TouchableOpacity>
      )}

      {/* Mobile Menu (only visible if open) */}
      {isSmallScreen && isMenuOpen && (
        <View style={styles.mobileMenu}>
          <TouchableOpacity style={styles.loginBtn} onPress={onLoginClick}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupBtn} onPress={onSignupClick}>
            <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 44,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    zIndex: 50,
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
  buttonRow: {
    flexDirection: "row",
  },
  loginBtn: {
    backgroundColor: "#d1fae5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  signupBtn: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnText: {
    fontWeight: "600",
    color: "#1e40af",
  },
  menuButton: {
    marginLeft: 8,
  },
  mobileMenu: {
    position: "absolute",
    top: 60,
    right: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    elevation: 4,
    zIndex: 55,
  },
});
