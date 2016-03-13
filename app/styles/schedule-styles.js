import React from 'react-native';
const StyleSheet = React.StyleSheet;

const scheduleStyles = {
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#fff'
  },
  sectionHeader: {
    backgroundColor: '#d1d2d4',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10
  },
  instructions: {
    color: '#333333',
    marginBottom: 5
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    paddingTop: 10,
    paddingBottom: 10
  },
  setTime: {
    backgroundColor: 'red',
    width: 74,
    color: 'white',
    textAlign: 'center'
  },
  band: {
    flex: 1,
    paddingLeft: 10
  },
  toggleSetTime: {
    backgroundColor: '#eee',
    width: 40,
    textAlign: 'center'
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc'
  }
};

export default scheduleStyles;
