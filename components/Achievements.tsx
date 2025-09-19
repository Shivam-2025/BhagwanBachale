// Achievements.tsx
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg from "react-native-svg";
import {
  VictoryArea,
  VictoryChart,
  VictoryPolarAxis,
} from "victory-native";

const screenWidth = Dimensions.get("window").width;

// Mock data
const achievements = [
  { id: 1, title: "First Steps", category: "Beginner", points: 10, icon: "walk", earned: true },
  { id: 2, title: "Consistent Performer", category: "Dedication", points: 25, icon: "trending-up", earned: true },
  { id: 3, title: "Speed Demon", category: "Performance", points: 50, icon: "speedometer", earned: true },
  { id: 4, title: "Endurance King", category: "Strength", points: 75, icon: "weight-lifter", earned: false, progress: 87 },
  { id: 5, title: "Jump Master", category: "Athletics", points: 60, icon: "human-jump", earned: false, progress: 43 },
  { id: 6, title: "Perfect Score", category: "Excellence", points: 100, icon: "trophy", earned: false, progress: 12 },
];

const performanceData = [
  { x: "Push-ups", y: 87 },
  { x: "Sit-ups", y: 72 },
  { x: "Jump", y: 81 },
  { x: "Sprint", y: 92 },
  { x: "Pull-ups", y: 83 },
];

const motivationalQuotes = [
  "Champions keep playing until they get it right! 💪",
  "Your only limit is your mind. Push beyond! 🚀",
  "Success starts with self-discipline 🎯",
  "Dream big, work hard, stay focused! ⭐",
];

export default function Achievements() {
  const [filter, setFilter] = useState("all");
  const [quoteIndex, setQuoteIndex] = useState(0);

  const categories = ["all", ...Array.from(new Set(achievements.map((a) => a.category)))];
  const filteredAchievements = achievements.filter((a) => filter === "all" || a.category === filter);
  const earnedCount = achievements.filter((a) => a.earned).length;
  const totalPoints = achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0);

  useEffect(() => {
    const interval = setInterval(
      () => setQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Achievement Engine</Text>
      <Text style={styles.subtitle}>
        Unlock badges, maintain streaks, and celebrate your progress
      </Text>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{earnedCount}</Text>
          <Text>Achievements</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{totalPoints}</Text>
          <Text>Points</Text>
        </View>
      </View>

      {/* Motivation */}
      <View style={styles.motivationCard}>
        <MaterialCommunityIcons name="auto-awesome" size={20} color="#fde047" />
        <Text style={styles.motivation}>{motivationalQuotes[quoteIndex]}</Text>
      </View>

      {/* Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setFilter(cat)}
            style={[styles.filterChip, filter === cat && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievements */}
      <View style={styles.grid}>
        {filteredAchievements.map((a) => (
          <View key={a.id} style={styles.badge}>
            <MaterialCommunityIcons
              name={a.icon}
              size={28}
              color={a.earned ? "#2563eb" : "#94a3b8"}
            />
            <Text style={styles.badgeTitle}>{a.title}</Text>
            {a.earned ? (
              <Text style={styles.badgeEarned}>+{a.points} pts</Text>
            ) : (
              <View style={{ width: "100%" }}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBar, { width: `${a.progress || 0}%` }]} />
                </View>
                <Text style={styles.progressText}>{a.progress || 0}%</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Performance */}
      <Text style={styles.sectionTitle}>Performance Overview</Text>
      <View style={{ alignItems: "center" }}>
        <Svg width={screenWidth - 40} height={300}>
          <VictoryChart
            polar
            domain={{ y: [0, 100] }}
            width={screenWidth - 40}
            height={300}
            standalone={false}
          >
            {performanceData.map((d, i) => (
              <VictoryPolarAxis
                key={i}
                dependentAxis
                axisValue={d.x}
                label={d.x}
                style={{
                  axis: { stroke: "#94a3b8" },
                  grid: { stroke: "#cbd5e1", strokeDasharray: "4,8" },
                  axisLabel: { fontSize: 10, padding: 15, fill: "#334155" },
                  tickLabels: { fill: "transparent" },
                }}
              />
            ))}
            <VictoryArea
              data={performanceData}
              style={{
                data: {
                  fill: "rgba(37,99,235,0.4)",
                  stroke: "#2563eb",
                  strokeWidth: 2,
                },
              }}
            />
          </VictoryChart>
        </Svg>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f8fafc" },
  title: { fontSize: 24, fontWeight: "bold", color: "#1e293b" },
  subtitle: { color: "#475569", marginBottom: 20 },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: { fontSize: 20, fontWeight: "bold", color: "#2563eb" },
  motivationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  motivation: { color: "#fff", marginLeft: 10, flex: 1, fontWeight: "500" },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#e2e8f0",
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: "#2563eb" },
  filterText: { color: "#475569" },
  filterTextActive: { color: "#fff" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  badge: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  badgeTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#1e293b",
    marginVertical: 4,
  },
  badgeEarned: { color: "#16a34a", fontWeight: "500" },
  progressBarBg: {
    backgroundColor: "#e2e8f0",
    borderRadius: 6,
    height: 6,
    width: "100%",
    marginTop: 4,
  },
  progressBar: { backgroundColor: "#2563eb", height: 6, borderRadius: 6 },
  progressText: { fontSize: 10, textAlign: "right", color: "#475569" },
  sectionTitle: { fontSize: 18, fontWeight: "600", color: "#1e293b", marginVertical: 12 },
});
