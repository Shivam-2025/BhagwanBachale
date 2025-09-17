// Leaderboard.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';

// Mock leaderboard data
const mockLeaderboard = [
  { id: 1, name: 'Rajesh Kumar', location: 'Delhi', score: 98, avatar: 'https://i.pravatar.cc/400?u=rajesh', rank: 1, previousRank: 2, sport: 'Athletics' },
  { id: 2, name: 'Priya Sharma', location: 'Mumbai', score: 95, avatar: 'https://i.pravatar.cc/400?u=priya', rank: 2, previousRank: 1, sport: 'Swimming' },
  { id: 3, name: 'Arjun Singh', location: 'Bangalore', score: 93, avatar: 'https://i.pravatar.cc/400?u=arjun', rank: 3, previousRank: 4, sport: 'Athletics' },
  { id: 4, name: 'Sneha Patel', location: 'Ahmedabad', score: 91, avatar: 'https://i.pravatar.cc/400?u=sneha', rank: 4, previousRank: 3, sport: 'Gymnastics' },
  { id: 5, name: 'Vikram Reddy', location: 'Hyderabad', score: 89, avatar: 'https://i.pravatar.cc/400?u=vikram', rank: 5, previousRank: 6, sport: 'Football' },
  { id: 6, name: 'Anita Gupta', location: 'Pune', score: 87, avatar: 'https://i.pravatar.cc/400?u=anita', rank: 6, previousRank: 5, sport: 'Basketball' },
];

export default function Leaderboard() {
  const [sortBy, setSortBy] = useState<'score' | 'rank'>('rank');
  const [filterSport, setFilterSport] = useState('all');

  const sports = ['all', ...Array.from(new Set(mockLeaderboard.map(a => a.sport)))];

  const filteredAndSortedData = mockLeaderboard
    .filter(a => filterSport === 'all' || a.sport === filterSport)
    .sort((a, b) => (sortBy === 'score' ? b.score - a.score : a.rank - b.rank));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pantheon of Champions</Text>
      <Text style={styles.subHeader}>India's top athletic talents competing nationwide</Text>

      {/* Filters */}
      <View style={styles.filterRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {sports.map(s => (
            <TouchableOpacity
              key={s}
              onPress={() => setFilterSport(s)}
              style={[
                styles.filterChip,
                filterSport === s && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filterSport === s && styles.filterTextActive,
                ]}
              >
                {s === 'all' ? 'All Sports' : s}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button
          size="sm"
          onPress={() => setSortBy(sortBy === 'rank' ? 'score' : 'rank')}
        >
          Sort: {sortBy}
        </Button>
      </View>

      {/* Top 3 Podium */}
      <View style={styles.podiumRow}>
        {filteredAndSortedData.slice(0, 3).map(a => (
          <View key={a.id} style={styles.podiumCol}>
            <Image source={{ uri: a.avatar }} style={styles.podiumAvatar} />
            <View
              style={[
                styles.podiumBase,
                a.rank === 1
                  ? styles.gold
                  : a.rank === 2
                  ? styles.silver
                  : styles.bronze,
              ]}
            >
              <Text style={styles.podiumRank}>#{a.rank}</Text>
              <Text style={styles.podiumName}>{a.name}</Text>
              <Text style={styles.podiumScore}>{a.score}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Full Leaderboard */}
      <Text style={styles.sectionTitle}>Complete Rankings</Text>
      {filteredAndSortedData.map(a => (
        <View key={a.id} style={styles.card}>
          <View style={styles.rankBadge}>
            <Text style={styles.rankText}>#{a.rank}</Text>
          </View>
          <Image source={{ uri: a.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.name}>{a.name}</Text>
            <Text style={styles.meta}>
              <Icon name="location-on" size={14} /> {a.location} ·{' '}
              <Icon name="sports" size={14} /> {a.sport}
            </Text>
          </View>
          <Text style={styles.score}>{a.score}%</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc' },
  header: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', textAlign: 'center' },
  subHeader: { textAlign: 'center', color: '#475569', marginBottom: 20 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    marginRight: 8,
  },
  filterChipActive: { backgroundColor: '#2563eb' },
  filterText: { color: '#475569' },
  filterTextActive: { color: '#fff' },
  podiumRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 24 },
  podiumCol: { alignItems: 'center', width: '30%' },
  podiumAvatar: { width: 72, height: 72, borderRadius: 36, marginBottom: 8 },
  podiumBase: {
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    width: '100%',
  },
  gold: { backgroundColor: '#facc15' },
  silver: { backgroundColor: '#d1d5db' },
  bronze: { backgroundColor: '#f59e0b' },
  podiumRank: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  podiumName: { color: '#fff', fontSize: 12 },
  podiumScore: { color: '#fff', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1e293b', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffdd',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  rankText: { color: '#fff', fontWeight: 'bold' },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 10 },
  info: { flex: 1 },
  name: { fontWeight: '600', color: '#1e293b' },
  meta: { fontSize: 12, color: '#64748b' },
  score: { fontWeight: '700', color: '#2563eb', fontSize: 16 },
});
