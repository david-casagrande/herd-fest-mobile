import React from 'react-native';

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
  backgroundColor: '#ccc'
};

const sectionHeader = {
  backgroundColor: '#d1d2d4',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 10
};

export default { row, rowContainer, separator, sectionHeader };
