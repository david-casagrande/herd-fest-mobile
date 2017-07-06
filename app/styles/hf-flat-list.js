import colors from './_colors';
import spacing from './_spacing';
import fontSizes from './_font-sizes';
import { StyleSheet } from 'react-native';

const item = {
  backgroundColor: colors.white,
  height: 52,
  flex: 1,
  justifyContent: 'center',
  paddingLeft: spacing.primary,
  paddingRight: spacing.primary
};

const label = {
  color: colors.secondary,
  fontSize: fontSizes.medium
};

export default StyleSheet.create({ item, label });
