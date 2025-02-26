import React, {FunctionComponent, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

import axios from '@/config/axios';
import {Recipe} from '@/types/recipe';

import {styles} from './style';
import RecipeItem from './_components/RecipeItem';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
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
              onSelectSteps={selectedSteps =>
                console.log(recipe.steps[selectedSteps])
              }
              style={styles.recipeItem}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
