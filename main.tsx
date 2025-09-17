// App.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import RootLayout from './RootLayout';
import MainApp from './App'; // your actual app component

export default function App() {
  return (
    <RootLayout>
      <MainApp />
    </RootLayout>
  );
}
