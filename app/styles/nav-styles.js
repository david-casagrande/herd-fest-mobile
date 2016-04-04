import { StyleSheet } from 'react-native';
import colors from './components/colors';
import fontSizes from './components/font-sizes';
import padding from './components/padding';

const navStyles = {
  messageText: {
    fontSize: fontSizes.medium,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15
  },
  buttonText: {
    fontSize: fontSizes.medium,
    fontWeight: '500'
  },
  navBar: {
    backgroundColor: colors.white
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9,
    color: colors.primary,
    width: 200,
    textAlign: 'center'
  },
  navBarLeftButton: {
    paddingLeft: padding.primary
  },
  navBarRightButton: {
    paddingRight: padding.primary
  },
  navBarButtonText: {
    color: colors.primary
  }
};

export default navStyles;
