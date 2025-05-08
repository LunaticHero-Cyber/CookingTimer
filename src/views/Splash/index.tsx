import React, {FunctionComponent, useEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';

import axios from '@/config/axios';
import {RootStackScreenProps} from '@/routes/root.navigation';
import {Recipe} from '@/types/recipe';

import {styles} from './style';

export interface SplashProps {}

export type SplashScreenProps = RootStackScreenProps<'Splash'>;

const Splash: FunctionComponent<SplashScreenProps> = ({navigation}) => {
  useEffect(() => {
    (async () => {
      const newRecipes = await axios.get<{data: Recipe[]}>('/recipes');
      if (!newRecipes.data.data) {
        return;
      }
      navigation.navigate('Home', {recipes: newRecipes.data.data});
    })();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container} testID="splash-view">
      <Text style={styles.text}>Welcome to the Cook Book</Text>
    </SafeAreaView>
  );
};

export default Splash;
