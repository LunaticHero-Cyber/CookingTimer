module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@/components': './src/components',
          '@/views': './src/views',
          '@/config': './src/config',
          '@/native-modules': './src/native-modules',
          '@/hooks': './src/hooks',
          '@/enums': './src/enums',
          '@/routes': './src/routes',
          '@/store': './src/store',
          '@/types': './src/types',
          '@/utils': './src/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
