import { StyleSheet } from 'react-native';

const navStyles = {
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD'
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500'
  },
  navBar: {
    backgroundColor: 'white'
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    // color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  navBarButtonText: {
    // color: cssVar('fbui-accent-blue')
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA'
  }
};

export default navStyles;
