import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const defaultUser = {
  name: "Shivam Yadav",
  age: 20,
  location: "Jaipur, Rajasthan",
  sport: "Athletics",
  joinDate: "March 2024",
  avatar: null as string | null,
};

const mockTests = [
  { name: "Push-ups Endurance", assigned: "2024-09-12", status: "completed", score: 92 },
  { name: "Vertical Jump", assigned: "2025-09-12", status: "pending", score: null },
  { name: "Sit-ups Challenge", assigned: "2025-09-12", status: "in-progress", score: null },
  { name: "Push-ups", assigned: "2025-09-12", status: "in-progress", score: null },
  { name: "Sprint Analysis", assigned: "", status: "upcoming", score: null },
];

const mockAchievements = [
  { title: "First Assessment", description: "Complete your first talent assessment", earned: true, icon: "sports-soccer", color: "#2563eb" },
  { title: "Consistent Performer", description: "Maintain 80%+ scores for 5 assessments", earned: true, icon: "trending-up", color: "#059669" },
  { title: "Demon Back", description: "Achieve top 2% in Pull-ups challenge", earned: false, icon: "speed", color: "#ea580c" },
  { title: "Endurance King", description: "Complete 100 push-ups in assessment", earned: false, icon: "fitness-center", color: "#9333ea" },
];

export default function Profile() {
  const [user, setUser] = useState(defaultUser);
  const [editing, setEditing] = useState(false);

  // Load from storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("profileData");
      if (saved) setUser(JSON.parse(saved));
    })();
  }, []);

  // Save to storage
  useEffect(() => {
    AsyncStorage.setItem("profileData", JSON.stringify(user));
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) {
      setUser({ ...user, avatar: result.assets[0].uri });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={pickImage}>
            {user.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="person" size={40} color="#94a3b8" />
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subText}>
            {user.age} yrs • {user.location}
          </Text>
          <View style={styles.sportTag}>
            <Icon name="sports-soccer" size={16} color="#2563eb" />
            <Text style={styles.sportText}>{user.sport}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Assessments</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>87</Text>
            <Text style={styles.statLabel}>Avg Score</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>1247</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editBtn} onPress={() => setEditing(true)}>
          <Icon name="edit" size={18} color="#fff" />
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Assigned Tests */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Assigned Tests</Text>
          <Icon name="assignment" size={20} color="#2563eb" />
        </View>
        {mockTests.map((test, index) => (
          <View key={index} style={styles.testRow}>
            <View style={styles.testLeft}>
              <View
                style={[
                  styles.testIcon,
                  test.status === "completed"
                    ? { backgroundColor: "#d1fae5" }
                    : test.status === "pending"
                    ? { backgroundColor: "#fef3c7" }
                    : test.status === "in-progress"
                    ? { backgroundColor: "#dbeafe" }
                    : { backgroundColor: "#f1f5f9" },
                ]}
              >
                <Icon
                  name={
                    test.status === "completed"
                      ? "check-circle"
                      : test.status === "pending"
                      ? "pending"
                      : test.status === "in-progress"
                      ? "play-circle-outline"
                      : "schedule"
                  }
                  size={18}
                  color={
                    test.status === "completed"
                      ? "#059669"
                      : test.status === "pending"
                      ? "#d97706"
                      : test.status === "in-progress"
                      ? "#2563eb"
                      : "#64748b"
                  }
                />
              </View>
              <View>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testDate}>
                  Assigned: {test.assigned || "—"}
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {test.score && (
                <Text style={styles.testScore}>{test.score}%</Text>
              )}
              <TouchableOpacity
                style={[
                  styles.testBtn,
                  test.status === "completed"
                    ? { backgroundColor: "#f1f5f9" }
                    : { backgroundColor: "#2563eb" },
                ]}
                disabled={test.status === "upcoming"}
              >
                <Text
                  style={[
                    styles.testBtnText,
                    test.status === "completed"
                      ? { color: "#475569" }
                      : { color: "white" },
                  ]}
                >
                  {test.status === "completed"
                    ? "View Result"
                    : test.status === "in-progress"
                    ? "Continue"
                    : test.status === "pending"
                    ? "Start Test"
                    : "Coming Soon"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Achievements */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Achievements</Text>
          <Icon name="emoji-events" size={20} color="#f97316" />
        </View>
        <View style={styles.achievementsGrid}>
          {mockAchievements.map((ach, index) => (
            <View
              key={index}
              style={[
                styles.achievementCard,
                ach.earned
                  ? { backgroundColor: "#f1f5f9" }
                  : { backgroundColor: "#e2e8f0", opacity: 0.6 },
              ]}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: ach.earned ? ach.color + "20" : "#cbd5e1" },
                ]}
              >
                <Icon
                  name={ach.icon}
                  size={20}
                  color={ach.earned ? ach.color : "#64748b"}
                />
              </View>
              <Text
                style={[
                  styles.achievementTitle,
                  { color: ach.earned ? "#1e293b" : "#64748b" },
                ]}
              >
                {ach.title}
              </Text>
              <Text
                style={[
                  styles.achievementDesc,
                  { color: ach.earned ? "#475569" : "#94a3b8" },
                ]}
              >
                {ach.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={editing} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={user.name}
              onChangeText={(t) => setUser({ ...user, name: t })}
              placeholder="Full Name"
            />
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={String(user.age)}
              onChangeText={(t) => setUser({ ...user, age: Number(t) })}
              placeholder="Age"
            />
            <TextInput
              style={styles.input}
              value={user.location}
              onChangeText={(t) => setUser({ ...user, location: t })}
              placeholder="Location"
            />
            <TextInput
              style={styles.input}
              value={user.sport}
              onChangeText={(t) => setUser({ ...user, sport: t })}
              placeholder="Sport"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={{ color: "#64748b" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setEditing(false)}>
                <Text style={{ color: "#2563eb", fontWeight: "bold" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc", padding: 16 },
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
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e2e8f0",
    justifyContent: "center",
    alignItems: "center",
  },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 8, color: "#1e293b" },
  subText: { color: "#64748b", fontSize: 14 },
  sportTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dbeafe",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  sportText: { marginLeft: 6, fontSize: 14, color: "#2563eb" },
  statsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  statBox: { alignItems: "center", flex: 1 },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#1e293b" },
  statLabel: { fontSize: 12, color: "#64748b" },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563eb",
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 20,
  },
  editBtnText: { marginLeft: 6, color: "white", fontWeight: "600" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: "600", color: "#1e293b" },

  // Tests
  testRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  testLeft: { flexDirection: "row", alignItems: "center" },
  testIcon: { width: 40, height: 40, borderRadius: 8, justifyContent: "center", alignItems: "center", marginRight: 12 },
  testName: { fontSize: 14, fontWeight: "500", color: "#1e293b" },
  testDate: { fontSize: 12, color: "#64748b" },
  testScore: { fontSize: 16, fontWeight: "bold", color: "#2563eb", marginRight: 10 },
  testBtn: { borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  testBtnText: { fontSize: 12, fontWeight: "600" },

  // Achievements
  achievementsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  achievementCard: {
    width: "48%",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  achievementTitle: { fontSize: 14, fontWeight: "600" },
  achievementDesc: { fontSize: 12 },
  // Modal
  modalContainer: { flex: 1, justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { backgroundColor: "white", borderRadius: 12, padding: 20, margin: 20 },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 12,
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
});
