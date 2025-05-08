import React from 'react';

import {colors} from '@/enums/colors';
import HomePage from '@/views/HomePage';
import Splash from '@/views/Splash';
import StepPage from '@/views/StepPage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';

import {RootStackParamList} from './interface.route';

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

const RootNavigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenListeners={{
          state: e => console.log('state changed', e.data),
        }}>
        <Stack.Group
          screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: colors.Pink3,
            },
            headerTintColor: '#4F4F4FFF',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18,
              alignSelf: 'center',
            },
          }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Step" component={StepPage} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
