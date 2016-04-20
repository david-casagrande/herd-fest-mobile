import React from 'react-native';

import colors from './colors';
import fontSizes from './font-sizes';
import padding from './padding';

const StyleSheet = React.StyleSheet;

const sectionHeaderHeight = 50;
const columnHeight = 52;

const rowContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const column = {
  height: columnHeight
};

const columnContainer = {
  flex: 1,
  justifyContent: 'center'
};

const sectionHeader = {
  backgroundColor: colors.primary,
  height: sectionHeaderHeight,
  flex: 1,
  justifyContent: 'center'
};

const sectionHeaderText = {
  marginLeft: padding.primary,
  marginRight: padding.primary,
  color: colors.white,
  fontWeight: 'bold',
  fontSize: fontSizes.medium
};

const separator = {
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.lightGrey
};

export default { rowContainer, column, columnContainer, separator, sectionHeader, sectionHeaderText };
