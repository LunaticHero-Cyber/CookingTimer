import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from './interface.route';
import HomePage from '@/views/HomePage';
import {colors} from '@/enums/colors';

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const RootNavigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenListeners={{
          state: e => console.log('state changed', e.data),
        }}>
        <Stack.Group
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.Pink3,
            },
            headerTintColor: '#FFFFFF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              alignSelf: 'center',
            },
          }}>
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
