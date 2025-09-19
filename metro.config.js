const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ignore WebGPU imports for React Native
config.resolver.blockList = [/.*tfjs-backend-webgpu.*/];

module.exports = config;
