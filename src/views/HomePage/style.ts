import {colors} from '@/enums/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.Pink1,
  },
  scrollView: {
    paddingHorizontal: 24,

    marginVertical: -4,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recipeItem: {
    width: '50%',

    marginVertical: 4,
  },
});
