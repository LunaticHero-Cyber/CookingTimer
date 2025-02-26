import React, {FunctionComponent} from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';

import {RootStackScreenProps} from '@/routes/root.navigation';
import {Step} from '@/types/recipe';

import {styles} from './style';

export interface StepPageProps {
  selectedStep: Step;
}

export type StepPageScreenProps = RootStackScreenProps<'Step'>;

const StepPage: FunctionComponent<StepPageScreenProps> = ({
  route: {
    params: {selectedStep},
  },
}) => {
  return (
    <SafeAreaView style={styles.container} testID="home-view">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Text>
          {selectedStep.name} - {selectedStep.time}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StepPage;
