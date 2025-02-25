import React, {FunctionComponent, useEffect, useMemo, useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView} from 'react-native';

import axios from '@/config/axios';
import {Recipe} from '@/types/recipe';

import {styles} from './style';
import RecipeItem from './_components/RecipeItem';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const dimension = Dimensions.get('window').width;

  const padding = 24;
  const paddedDim = useMemo(() => dimension - padding, [dimension]);

  const positions = useMemo(() => {
    let newPos = [{x: padding / 2, y: 0}];
    let height = 0;

    // Skip the first index
    for (let i = 1; i < recipes.length; i++) {
      height = (i + 1) % 2 !== 1 ? height : height + 100;
      const x = (i + 1) % 2 !== 1 ? paddedDim / 2 : padding / 2;
      console.log(x);
      newPos = newPos.concat({x: x, y: height});
    }

    return newPos;
  }, [paddedDim, recipes.length]);

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
        {recipes.map((value, index) => {
          return (
            <RecipeItem
              key={value.id}
              recipe={value}
              positions={positions}
              currentIndex={index}
              style={styles.recipeItem}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
