import React, {FunctionComponent, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import axios from '@/config/axios';
import {RootStackScreenProps} from '@/routes/root.navigation';
import {Recipe} from '@/types/recipe';

import RecipeItem from './_components/RecipeItem';
import {styles} from './style';

export interface HomePageProps {}

export type HomePageScreenProps = RootStackScreenProps<'Home'>;

const HomePage: FunctionComponent<HomePageScreenProps> = ({navigation}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    (async () => {
      const newRecipes = await axios.get<{data: Recipe[]}>('/recipes');
      if (!newRecipes.data.data) {
        return;
      }

      setRecipes(newRecipes.data.data);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container} testID="home-view">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {recipes.map(recipe => {
          return (
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              onPress={() => {
                const selectedStep = recipe.steps[0];
                navigation.navigate('Step', {selectedStep: selectedStep});
              }}
              onSelectSteps={selectedStepIndex => {
                const selectedStep = recipe.steps[selectedStepIndex];
                navigation.navigate('Step', {selectedStep: selectedStep});
              }}
              style={styles.recipeItem}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
