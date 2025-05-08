import {colors} from '@/enums/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: colors.Pink1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: 24,
    backgroundColor: colors.Pink4,
  },
});
