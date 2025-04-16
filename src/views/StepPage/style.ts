import {colors} from '@/enums/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 24,
    marginVertical: -4,
    backgroundColor: colors.Pink1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  stepTextContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  stepImage: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    backgroundColor: 'red',
  },
  stepText: {
    marginBottom: 8,
  },
  timerText: {
    marginBottom: 32,
  },
  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 36,
  },
  buttons: {
    marginBottom: 8,
  },
});
