// Auth.tsx
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';

type AuthMode = 'login' | 'register';

export default function Auth({
  onAuthSuccess,
  onBack,
}: {
  onAuthSuccess?: () => void;
  onBack?: () => void; // ✅ back handler
}) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    location: '',
    sport: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAuthSuccess?.();
    }, 2000);
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://storage.googleapis.com/cosmic-generated-assets/backgrounds/4k/cosmic-bg-1un44iuokg.jpg',
      }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          {/* ✅ Back Button */}
          {onBack && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Icon name="arrow-back-ios" size={20} color="#334155" />
            </TouchableOpacity>
          )}

          {/* Icon */}
          <View style={styles.iconBox}>
            <Icon name="sports" size={28} color="#fff" />
          </View>

          <Text style={styles.title}>
            {mode === 'login' ? 'Welcome Back' : 'Join KhelSaksham'}
          </Text>
          <Text style={styles.subtitle}>
            {mode === 'login'
              ? 'Continue your athletic journey'
              : 'Start your talent assessment journey'}
          </Text>

          {/* Mode toggle */}
          <View style={styles.toggleRow}>
            <TouchableOpacity
              onPress={() => setMode('login')}
              style={[styles.toggleButton, mode === 'login' && styles.toggleActive]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  mode === 'login' && styles.toggleActiveText,
                ]}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMode('register')}
              style={[styles.toggleButton, mode === 'register' && styles.toggleActive]}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  mode === 'register' && styles.toggleActiveText,
                ]}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          {mode === 'register' && (
            <>
              <TextInput
                placeholder="Full Name"
                style={styles.input}
                value={formData.name}
                onChangeText={v => handleChange('name', v)}
              />
              <TextInput
                placeholder="Age"
                keyboardType="numeric"
                style={styles.input}
                value={formData.age}
                onChangeText={v => handleChange('age', v)}
              />
              <TextInput
                placeholder="City"
                style={styles.input}
                value={formData.location}
                onChangeText={v => handleChange('location', v)}
              />
              <TextInput
                placeholder="Sport"
                style={styles.input}
                value={formData.sport}
                onChangeText={v => handleChange('sport', v)}
              />
            </>
          )}

          <TextInput
            placeholder="Email"
            style={styles.input}
            value={formData.email}
            onChangeText={v => handleChange('email', v)}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={formData.password}
            onChangeText={v => handleChange('password', v)}
          />

          <Button onPress={handleSubmit} loading={loading}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>

          <TouchableOpacity
            onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            <Text style={styles.switchText}>
              {mode === 'login'
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </Text>
          </TouchableOpacity>

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#2563eb" />
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 10,
    padding: 6,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16, // ✅ extra margin so icon doesn’t clash with back button
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1e293b',
  },
  subtitle: { textAlign: 'center', color: '#475569', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleButtonText: { color: '#475569', fontWeight: '500' },
  toggleActive: { backgroundColor: '#fff' },
  toggleActiveText: { color: '#2563eb' },
  switchText: {
    color: '#2563eb',
    marginTop: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffffaa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
