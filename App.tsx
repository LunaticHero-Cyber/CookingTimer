/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FunctionComponent} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {colors} from '@/enums/colors';
import RootNavigation from '@/routes/root.navigation';

const App: FunctionComponent = (): React.JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={colors.Pink5}
      />
      <RootNavigation />
    </>
  );
};

export default App;
