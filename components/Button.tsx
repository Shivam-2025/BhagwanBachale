// Button.tsx
import React, { ReactNode, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onPress,
  disabled,
  loading,
}: ButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.base,
          styles[variant],
          styles[size],
          disabled && { opacity: 0.6 },
        ]}
        disabled={disabled || loading}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.text}>{children}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { color: '#fff', fontWeight: '600' },

  primary: { backgroundColor: '#2563eb' },
  secondary: { backgroundColor: '#10b981' },
  outline: {
    borderWidth: 2,
    borderColor: '#2563eb',
    backgroundColor: 'transparent',
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  sm: { paddingVertical: 6, paddingHorizontal: 12 },
  md: { paddingVertical: 10, paddingHorizontal: 16 },
  lg: { paddingVertical: 14, paddingHorizontal: 20 },
});
