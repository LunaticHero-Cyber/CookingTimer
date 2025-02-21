/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import HomePage from '@/views/HomePage';
import React from 'react';
import {StatusBar, useColorScheme, View} from 'react-native';
import {colors} from './src/enums/colors';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.lightPink}
      />
      <HomePage />
    </View>
  );
}

export default App;
