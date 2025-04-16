import React, {
  FunctionComponent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Button, SafeAreaView, ScrollView, Text} from 'react-native';

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
  const interval = useRef<NodeJS.Timeout>();

  const [timer, setTimer] = useState(selectedStep.time);
  const [status, setStatus] = useState('STOP');

  const startCountdown = () => setStatus('START');
  const stopCountdown = () => setStatus('STOP');
  const resetCountdown = () => {
    setStatus('STOP');
    setTimer(selectedStep.time);
  };

  const timeString = useMemo(() => {
    const newDateTime = new Date(timer * 1000);

    const hours =
      newDateTime.getUTCHours().toString().length === 1
        ? `0${newDateTime.getUTCHours().toString()}`
        : newDateTime.getUTCHours().toString();

    const minutes =
      newDateTime.getMinutes().toString().length === 1
        ? `0${newDateTime.getMinutes().toString()}`
        : newDateTime.getMinutes().toString();

    const seconds =
      newDateTime.getSeconds().toString().length === 1
        ? `0${newDateTime.getSeconds().toString()}`
        : newDateTime.getSeconds().toString();

    if (!newDateTime.getUTCHours()) {
      return `${minutes}:${seconds}`;
    }

    return `${hours}:${minutes}:${seconds}`;
  }, [timer]);

  useEffect(() => {
    if (status === 'START') {
      interval.current && clearInterval(interval.current);
      interval.current = setInterval(() => {
        const newTimer = timer - 1;
        setTimer(newTimer);

        if (timer === 0) {
          interval.current && clearInterval(interval.current);
        }
      }, 1000);
    } else if (status === 'STOP') {
      clearInterval(interval.current);
    }

    return () => clearInterval(interval.current);
  }, [timer, status]);

  return (
    <SafeAreaView style={styles.container} testID="home-view">
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.stepText}>{selectedStep.name}</Text>
        <Text style={styles.timerText}>{timeString}</Text>
        <Button title="Start the step" onPress={startCountdown} />
        <Button title="Stop step" onPress={stopCountdown} />
        <Button title="Reset countdown" onPress={resetCountdown} />
        <Button title="Next step" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default StepPage;
