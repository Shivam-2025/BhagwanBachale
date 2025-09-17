// Achievements.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

// mock data (same as your original)
const achievements = [
  { id: 1, title: 'First Steps', category: 'Beginner', points: 10, icon: 'sports', earned: true, earnedDate: '2024-09-01', rarity: 'common' },
  { id: 2, title: 'Consistent Performer', category: 'Dedication', points: 25, icon: 'trending-up', earned: true, earnedDate: '2024-09-05', rarity: 'common' },
  { id: 3, title: 'Speed Demon', category: 'Performance', points: 50, icon: 'speed', earned: true, earnedDate: '2024-09-08', rarity: 'rare' },
  { id: 4, title: 'Endurance King', category: 'Strength', points: 75, icon: 'fitness-center', earned: false, progress: 87, rarity: 'epic' },
  { id: 5, title: 'Jump Master', category: 'Athletics', points: 60, icon: 'sports-kabaddi', earned: false, progress: 43, rarity: 'rare' },
  { id: 6, title: 'Perfect Score', category: 'Excellence', points: 100, icon: 'emoji-events', earned: false, progress: 12, rarity: 'legendary' },
];

const performanceData = [
  { assessment: 'Push-ups', score: 87, max: 100 },
  { assessment: 'Sit-ups', score: 72, max: 100 },
  { assessment: 'Jump', score: 65, max: 80 },
  { assessment: 'Sprint', score: 92, max: 100 },
  { assessment: 'Pull-ups', score: 50, max: 60 },
];

const motivationalQuotes = [
  'Champions keep playing until they get it right! 💪',
  'Your only limit is your mind. Push beyond! 🚀',
  'Success starts with self-discipline 🎯',
  'Dream big, work hard, stay focused! ⭐',
];

const streakData = {
  current: 7,
  longest: 12,
  target: 14,
  weekData: [
    { day: 'Mon', completed: true },
    { day: 'Tue', completed: true },
    { day: 'Wed', completed: true },
    { day: 'Thu', completed: true },
    { day: 'Fri', completed: false },
    { day: 'Sat', completed: true },
    { day: 'Sun', completed: true },
  ],
};

function getCurrentStreak(weekData: typeof streakData.weekData) {
  let streak = 0;
  for (let i = weekData.length - 1; i >= 0; i--) {
    if (weekData[i].completed) streak++;
    else break;
  }
  return streak;
}

export default function Achievements() {
  const [filter, setFilter] = useState('all');
  const [quoteIndex, setQuoteIndex] = useState(0);

  const categories = ['all', ...Array.from(new Set(achievements.map(a => a.category)))];
  const filteredAchievements = achievements.filter(a => filter === 'all' || a.category === filter);
  const earnedCount = achievements.filter(a => a.earned).length;
  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(prev => (prev + 1) % motivationalQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Achievement Engine</Text>
      <Text style={styles.subtitle}>Unlock badges, maintain streaks, and celebrate your progress</Text>

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
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{getCurrentStreak(streakData.weekData)}</Text>
          <Text>Day Streak</Text>
        </View>
      </View>

      {/* Motivation */}
      <View style={styles.motivationCard}>
        <Icon name="auto-awesome" size={20} color="#fde047" />
        <Text style={styles.motivation}>{motivationalQuotes[quoteIndex]}</Text>
      </View>

      {/* Filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginVertical: 12 }}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setFilter(cat)}
            style={[styles.filterChip, filter === cat && styles.filterChipActive]}>
            <Text style={[styles.filterText, filter === cat && styles.filterTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Achievements */}
      <View style={styles.grid}>
        {filteredAchievements.map(a => (
          <View key={a.id} style={styles.badge}>
            <Icon name={a.icon} size={28} color={a.earned ? '#2563eb' : '#94a3b8'} />
            <Text style={styles.badgeTitle}>{a.title}</Text>
            {a.earned ? (
              <Text style={styles.badgeEarned}>+{a.points} pts</Text>
            ) : (
              <View style={{ width: '100%' }}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBar, { width: `${a.progress || 0}%` }]} />
                </View>
                <Text style={styles.progressText}>{a.progress || 0}%</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Streak */}
      <View style={styles.streakCard}>
        <Text style={styles.sectionTitle}>Streak Tracker</Text>
        <View style={styles.weekRow}>
          {streakData.weekData.map(day => (
            <View key={day.day} style={styles.dayCol}>
              <Text style={styles.dayLabel}>{day.day}</Text>
              <View style={[styles.dayCircle, day.completed && styles.dayCircleActive]}>
                <Icon
                  name={day.completed ? 'check' : 'close'}
                  size={14}
                  color={day.completed ? '#fff' : '#94a3b8'}
                />
              </View>
            </View>
          ))}
        </View>
        <Text style={styles.streakFooter}>Longest: {streakData.longest} days</Text>
      </View>

      {/* Performance */}
      <Text style={styles.sectionTitle}>Performance Overview</Text>
      <RadarChart
        data={{
          labels: performanceData.map(d => d.assessment),
          datasets: [{ data: performanceData.map(d => d.score) }],
        }}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => '#2563eb',
          strokeWidth: 2,
        }}
        style={{ alignSelf: 'center' }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  subtitle: { color: '#475569', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statCard: { backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', flex: 1, marginHorizontal: 4 },
  statNumber: { fontSize: 20, fontWeight: 'bold', color: '#2563eb' },
  motivationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#2563eb', padding: 14, borderRadius: 12, marginBottom: 20 },
  motivation: { color: '#fff', marginLeft: 10, flex: 1, fontWeight: '500' },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#e2e8f0', borderRadius: 16, marginRight: 8 },
  filterChipActive: { backgroundColor: '#2563eb' },
  filterText: { color: '#475569' },
  filterTextActive: { color: '#fff' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  badge: { width: '48%', backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, alignItems: 'center' },
  badgeTitle: { fontSize: 12, fontWeight: '600', textAlign: 'center', color: '#1e293b', marginVertical: 4 },
  badgeEarned: { color: '#16a34a', fontWeight: '500' },
  progressBarBg: { backgroundColor: '#e2e8f0', borderRadius: 6, height: 6, width: '100%', marginTop: 4 },
  progressBar: { backgroundColor: '#2563eb', height: 6, borderRadius: 6 },
  progressText: { fontSize: 10, textAlign: 'right', color: '#475569' },
  streakCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginVertical: 12 },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  dayCol: { alignItems: 'center' },
  dayLabel: { fontSize: 10, color: '#64748b' },
  dayCircle: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center' },
  dayCircleActive: { backgroundColor: '#16a34a' },
  streakFooter: { textAlign: 'center', color: '#64748b', marginTop: 8 },
});
