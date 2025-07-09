const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

// This is Default Metro configuration for React Native projects.Add commentMore actions
const defaultConfig = getDefaultConfig(__dirname);

const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

const config = mergeConfig(defaultConfig, svgConfig);

module.exports = withNativeWind(config, { input: './global.css' });
