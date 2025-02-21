import React, {Fragment, FunctionComponent} from 'react';
import {ScrollView, Text} from 'react-native';
import {styles} from './style';

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <Fragment>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Text>All starts smol</Text>
      </ScrollView>
    </Fragment>
  );
};

export default HomePage;
