import React from 'react-native';
import colors from './colors';
import fontSizes from './font-sizes';
import padding from './padding';

const StyleSheet = React.StyleSheet;

const row = {
  paddingTop: padding.secondary,
  paddingBottom: padding.secondary
};

const rowContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const separator = {
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.lightGrey
};

const sectionHeader = {
  backgroundColor: colors.primary,
  paddingTop: padding.primary,
  paddingBottom: padding.primary,
  paddingLeft: padding.primary,
  color: colors.white,
  fontWeight: 'bold',
  fontSize: fontSizes.medium
};

export default { row, rowContainer, separator, sectionHeader };
