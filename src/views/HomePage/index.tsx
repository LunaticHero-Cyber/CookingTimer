import React, {FunctionComponent, useEffect} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {styles} from './style';
import axios from '@/config/axios';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  useEffect(() => {
    console.log(axios.get('/recipes'));
  }, []);

  return (
    <SafeAreaView style={styles.container} testID="home-view">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Text>All starts smol</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;
