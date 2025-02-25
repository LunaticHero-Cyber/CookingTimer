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

    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',

    marginVertical: 36,
  },
  recipeItem: {
    width: '50%',

    marginVertical: 4,
  },
});
