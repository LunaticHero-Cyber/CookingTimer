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
  stepText: {
    marginVertical: 18,
  },
  timerText: {
    marginVertical: 18,
  },
  recipeItem: {
    width: '50%',

    marginVertical: 4,
  },
});
