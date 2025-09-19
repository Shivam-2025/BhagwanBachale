# Overview

KhelSaksham (खेळ सक्षम) is a cross-platform mobile application built with React Native and Expo that democratizes sports talent discovery through AI-powered assessment for Indian athletes. The app allows users to record and assess their athletic performance, view leaderboards, track achievements, and compete with other athletes nationwide. It features comprehensive talent assessment tools including push-ups, sit-ups, jump tests, and other physical evaluations with video recording capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router with file-based routing and React Navigation for tab navigation
- **Routing Strategy**: Tab-based navigation with stack navigation for modals
- **State Management**: React hooks (useState, useEffect) with local state management
- **Styling**: React Native StyleSheet with NativeWind for utility-first styling
- **UI Components**: Custom themed components with light/dark mode support
- **Animation**: React Native Reanimated for smooth animations and transitions

## Component Structure
- **Layout Components**: Separate public and private navigation bars based on authentication state
- **Feature Components**: Dashboard, Profile, Recording, Leaderboard, Achievements, Auth
- **UI Components**: Reusable Button, themed text/view components, collapsibles
- **Utility Components**: External link handling, haptic feedback for tabs

## Data Storage
- **Local Storage**: AsyncStorage for user data persistence, profile information, and authentication state
- **Media Storage**: Expo ImagePicker and Camera for photo/video capture and storage
- **Mock Data**: Currently uses mock data for achievements, leaderboard, and performance statistics

## Authentication & Authorization
- **Authentication Flow**: Custom auth component with login/register modes
- **Session Management**: AsyncStorage-based session persistence
- **User State**: Simple user object with profile information stored locally
- **Permission Handling**: Camera and microphone permissions for recording assessments

## Performance & Media Features
- **Camera Integration**: Expo Camera for video recording of athletic assessments
- **Image Handling**: Expo Image and ImagePicker for profile photos and media
- **Chart Visualization**: React Native Chart Kit with SVG support for performance analytics
- **Gesture Handling**: React Native Gesture Handler for enhanced touch interactions

## Cross-Platform Support
- **Target Platforms**: iOS, Android, and Web
- **Responsive Design**: Platform-specific adaptations with conditional styling
- **Icon System**: SF Symbols on iOS with Material Icons fallback for Android/Web
- **Haptic Feedback**: iOS-specific haptic feedback for enhanced user experience

# External Dependencies

## Core Framework
- **Expo SDK**: Complete development platform with managed workflow
- **React Native**: Cross-platform mobile development framework
- **React Navigation**: Navigation library with bottom tabs and native stack

## Media & Camera
- **expo-camera**: Camera access for recording athletic assessments
- **expo-image**: Optimized image component with caching
- **expo-image-picker**: Image and video selection from device gallery

## UI & Visualization
- **react-native-chart-kit**: Chart visualization for performance analytics
- **react-native-svg**: SVG rendering support for charts and icons
- **react-native-vector-icons**: Icon library with Material Icons
- **@expo/vector-icons**: Expo's vector icon collection
- **nativewind**: Utility-first styling system

## Storage & Utilities
- **@react-native-async-storage/async-storage**: Persistent local data storage
- **expo-haptics**: Haptic feedback for iOS devices
- **expo-linking**: Deep linking and URL handling
- **expo-web-browser**: In-app browser functionality

## Development Tools
- **TypeScript**: Static type checking and development experience
- **ESLint**: Code linting with Expo configuration
- **Babel**: JavaScript compilation with Expo preset

## Permissions & System
- **expo-constants**: Access to system constants and app configuration
- **expo-status-bar**: Status bar appearance management
- **react-native-safe-area-context**: Safe area handling for different devices
- **react-native-screens**: Native screen management for better performance

# Recent Changes

## September 19, 2025 - Replit Environment Setup Complete
- **Successfully configured** the React Native/Expo project for Replit environment
- **Fixed TensorFlow.js initialization** to work with server-side rendering by implementing dynamic imports and browser environment checks
- **Updated camera component** from deprecated `Camera` to modern `CameraView` API for Expo SDK 54 compatibility
- **Configured Expo dev server** to run on port 5000 with proper web hosting
- **Resolved dependency conflicts** between TensorFlow packages using `npm install --force`
- **Set up deployment configuration** for autoscale hosting
- **All features working**: App successfully loads, TensorFlow initializes, and the fitness tracking functionality is operational