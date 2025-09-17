import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const mockStats = [
  { label: "Total Assessments", value: 24, trend: "+12%", icon: "sports-soccer", color: "#2563eb" },
  { label: "Average Score", value: 87, trend: "+5%", icon: "show-chart", color: "#059669" },
  { label: "Global Rank", value: 1247, trend: "-23", icon: "emoji-events", color: "#ea580c" },
  { label: "Streak Days", value: 7, trend: "+2", icon: "trending-up", color: "#9333ea" },
];

const mockChartData = [
  { month: "Jan", score: 65 },
  { month: "Feb", score: 72 },
  { month: "Mar", score: 78 },
  { month: "Apr", score: 85 },
  { month: "May", score: 87 },
];

// Counter Component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = () => {
      start += Math.ceil(value / 20);
      if (start >= value) {
        setCount(value);
      } else {
        setCount(start);
        requestAnimationFrame(step);
      }
    };
    step();
  }, [value]);
  return <Text>{count}</Text>;
};

// Simple Bar Chart
const SimpleBarChart = ({ data }: { data: typeof mockChartData }) => {
  const maxScore = Math.max(...data.map((d) => d.score));
  return (
    <View style={styles.chartRow}>
      {data.map((item) => (
        <View key={item.month} style={styles.chartBarContainer}>
          <View
            style={[
              styles.chartBar,
              { height: (item.score / maxScore) * 120 },
            ]}
          />
          <Text style={styles.chartLabel}>{item.month}</Text>
          <Text style={styles.chartValue}>{item.score}</Text>
        </View>
      ))}
    </View>
  );
};

// Sync Status
const SyncStatus = () => {
  const status: "synced" | "pending" | "error" = "synced";
  const config = {
    synced: { color: "#059669", icon: "check-circle", text: "Synced" },
    pending: { color: "#f59e0b", icon: "sync", text: "Syncing..." },
    error: { color: "#dc2626", icon: "error", text: "Sync Error" },
  };
  return (
    <View style={[styles.syncBadge, { backgroundColor: config[status].color + "20" }]}>
      <Icon name={config[status].icon} size={16} color={config[status].color} />
      <Text style={[styles.syncText, { color: config[status].color }]}>
        {config[status].text}
      </Text>
    </View>
  );
};

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mission Control</Text>
          <Text style={styles.headerSubtitle}>
            Your athletic performance dashboard
          </Text>
        </View>
        <View style={styles.headerActions}>
          <SyncStatus />
          <TouchableOpacity style={styles.syncBtn}>
            <Icon name="refresh" size={18} color="#334155" />
            <Text style={styles.syncBtnText}>Sync Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        {mockStats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: stat.color + "20" }]}>
              <Icon name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text
              style={[
                styles.statTrend,
                { color: stat.trend.startsWith("+") ? "#059669" : "#dc2626" },
              ]}
            >
              {stat.trend}
            </Text>
            <Text style={styles.statValue}>
              <AnimatedCounter value={stat.value} />
            </Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Performance Chart */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Performance Trend</Text>
          <Icon name="show-chart" size={20} color="#2563eb" />
        </View>
        <SimpleBarChart data={mockChartData} />
      </View>

      {/* Recent Activities */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recent Activities</Text>
          <Icon name="sports-soccer" size={20} color="#059669" />
        </View>
        <View>
          {[
            { activity: "Push-ups Assessment", score: 92, time: "2 hours ago", icon: "fitness-center" },
            { activity: "Vertical Jump Test", score: 85, time: "1 day ago", icon: "directions-run" },
            { activity: "Sit-ups Challenge", score: 78, time: "3 days ago", icon: "accessibility" },
          ].map((item) => (
            <View key={item.activity} style={styles.activityRow}>
              <View style={styles.activityIcon}>
                <Icon name={item.icon} size={18} color="#475569" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.activityName}>{item.activity}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              <Text style={styles.activityScore}>{item.score}%</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1e293b" },
  headerSubtitle: { fontSize: 14, color: "#475569" },
  headerActions: { flexDirection: "row", alignItems: "center" },
  syncBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 12,
    backgroundColor: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  syncBtnText: { marginLeft: 6, color: "#334155", fontSize: 14 },
  syncBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  syncText: { marginLeft: 4, fontSize: 12, fontWeight: "600" },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: "48%",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  statTrend: { position: "absolute", top: 12, right: 12, fontSize: 12 },
  statValue: { fontSize: 24, fontWeight: "bold", marginTop: 20, color: "#1e293b" },
  statLabel: { fontSize: 12, color: "#64748b" },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1e293b" },
  chartRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around", height: 150 },
  chartBarContainer: { alignItems: "center" },
  chartBar: { width: 20, backgroundColor: "#2563eb", borderRadius: 6 },
  chartLabel: { fontSize: 12, color: "#475569", marginTop: 4 },
  chartValue: { fontSize: 12, fontWeight: "bold", color: "#1e293b" },
  activityRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  activityIcon: { width: 40, height: 40, borderRadius: 8, backgroundColor: "#f1f5f9", justifyContent: "center", alignItems: "center", marginRight: 12 },
  activityName: { fontSize: 14, fontWeight: "500", color: "#1e293b" },
  activityTime: { fontSize: 12, color: "#64748b" },
  activityScore: { fontSize: 16, fontWeight: "bold", color: "#2563eb" },
});
