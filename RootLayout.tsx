import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // light background
    paddingTop: 40, // safe area-ish spacing (optional)
  },
});
