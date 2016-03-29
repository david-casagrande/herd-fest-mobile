import React from 'react-native';
import colors from './colors';
import fontSizes from './font-sizes';

const StyleSheet = React.StyleSheet;

const row = {
  paddingTop: 10,
  paddingBottom: 10
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
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10,
  color: '#fff',
  fontWeight: 'bold',
  fontSize: fontSizes.medium
};

export default { row, rowContainer, separator, sectionHeader };
