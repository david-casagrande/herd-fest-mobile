import colors from './components/colors';
import fontSizes from './components/font-sizes';
import padding from './components/padding';
import utils from '../utils';

const iosNavBarTextMargin = 10;
const androidNavBarTextMargin = 18;

const iosNavBarTitleTextMargin = 9;
const androidNavBarTitleTextMargin = 17; // eslint-disable-line id-length

const navStyles = {
  messageText: {
    fontSize: fontSizes.medium,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15
  },
  navBar: {
    backgroundColor: colors.white
  },
  navBarText: {
    fontSize: fontSizes.medium,
    fontWeight: '500',
    color: colors.secondary,
    marginVertical: utils.isAndroid() ? androidNavBarTextMargin : iosNavBarTextMargin
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: utils.isAndroid() ? androidNavBarTitleTextMargin : iosNavBarTitleTextMargin,
    color: colors.secondary,
    width: 200,
    textAlign: 'center'
  },
  navBarContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  navBarVenueTitleText: {
    marginVertical: 0,
    fontSize: 13
  },
  navBarAddressTitleText: {
    marginVertical: 0,
    fontSize: fontSizes.medium
  },
  navBarLeftButton: {
    marginLeft: padding.primary
  },
  navBarRightButton: {
    marginRight: padding.primary
  }
};

export default navStyles;
