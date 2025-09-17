import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';

// Import the main app from the routing structure
import KhelSakshamApp from './app/(tabs)';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <KhelSakshamApp />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

registerRootComponent(App);
export default App;
