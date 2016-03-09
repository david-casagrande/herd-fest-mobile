import React, { StyleSheet } from 'react-native';

const dayListStyles = {
  container: {
    flex: 1,
    paddingTop: 64
  },
  sectionHeader: {
    backgroundColor: '#d1d2d4',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  setTime: {
    backgroundColor: 'red',
    width: 74,
    color: 'white'
  },
  toggleSetTime: {
    position: 'absolute'
    // textAlign: 'right'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CCCCCC'
  }
};

export default dayListStyles;
