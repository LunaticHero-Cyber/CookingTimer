import React, {FunctionComponent} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import {styles} from './style';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
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
