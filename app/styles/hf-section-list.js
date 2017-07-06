import colors from './_colors';
import spacing from './_spacing';
import fontSizes from './_font-sizes';
import { StyleSheet } from 'react-native';

const sectionHeader = {
  backgroundColor: colors.primary,
  height: 50,
  flex: 1,
  justifyContent: 'center'
};

const sectionHeaderText = {
  marginLeft: spacing.primary,
  marginRight: spacing.primary,
  color: colors.white,
  fontWeight: 'bold',
  fontSize: fontSizes.medium
};

const item = {
  height: 50
};

export default StyleSheet.create({ sectionHeader, sectionHeaderText, item });
