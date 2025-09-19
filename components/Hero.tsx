import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface HeroProps {
  onExplore?: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <ImageBackground
      source={{
        uri: "https://storage.googleapis.com/cosmic-generated-assets/backgrounds/4k/cosmic-bg-w515lqnoo.jpg",
      }}
      style={styles.hero}
      resizeMode="cover"
    >
      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Content */}
      <View style={styles.content}>
        {/* Badge */}
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Now Live for Indian Athletes</Text>
          <Icon name="arrow-forward" size={16} color="#475569" />
        </View>

        {/* Title */}
        <Text style={styles.title}>
          <Text style={styles.titleGradient}>KhelSaksham</Text>
          {"\n"}
          <Text style={styles.subtitle}>खेळ सक्षम</Text>
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Democratizing sports talent discovery through AI-powered assessment
          for every Indian athlete
        </Text>

        {/* Secondary Text */}
        <Text style={styles.secondaryText}>
          Record your performance, get AI-powered feedback, compare with
          benchmarks, and unlock your potential in sports talent assessment.
        </Text>

        {/* CTA Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.exploreBtn}
            onPress={() => onExplore && onExplore()}
          >
            <Icon name="sports-soccer" size={20} color="white" />
            <Text style={styles.btnText}> Explore </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.learnBtn}>
            <Icon name="play-circle-outline" size={20} color="#2563eb" />
            <Text style={[styles.btnText, { color: "#2563eb" }]}>
              Learn More
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Icon name="person" size={24} color="#2563eb" />
            <Text style={styles.statValue}>10,000+</Text>
            <Text style={styles.statLabel}>Athletes</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="sports-football" size={24} color="#2563eb" />
            <Text style={styles.statValue}>50,000+</Text>
            <Text style={styles.statLabel}>Assessments</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="emoji-events" size={24} color="#2563eb" />
            <Text style={styles.statValue}>94%</Text>
            <Text style={styles.statLabel}>Success Rate</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    minHeight: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(248, 250, 252, 0.8)",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
    marginTop: 77,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
    marginRight: 6,
  },
  badgeText: {
    fontSize: 12,
    color: "#334155",
    marginRight: 6,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1e293b",
  },
  titleGradient: {
    color: "#2563eb", // Could use expo-linear-gradient for gradient text
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "300",
    color: "#475569",
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#475569",
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  secondaryText: {
    fontSize: 14,
    textAlign: "center",
    color: "#64748b",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  exploreBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginRight: 12,
  },
  learnBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "90%",
  },
  statCard: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e293b",
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    color: "#475569",
  },
});
