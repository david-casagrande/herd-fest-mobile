import ReactNative from 'react-native';

import colors from './components/colors';
import container from './components/container';
import fontSizes from './components/font-sizes';
import padding from './components/padding';
import utils from '../utils';

const androidOffset = 100;
const iosOffset = 80;
const iosPadding = 10;
const offset = utils.isAndroid() ? androidOffset : iosOffset;
const width = ReactNative.Dimensions.get('window').width - offset;
const paddingTop = utils.isAndroid() ? 0 : iosPadding;

const homeStyles = {
  container: Object.assign({}, container.container, { paddingTop }),
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width,
    height: width,
    marginBottom: 24
  },
  days: {
    width
  },
  link: {
    borderColor: colors.primary,
    borderWidth: 2,
    marginBottom: padding.primary,
    paddingTop: padding.primary,
    paddingBottom: padding.primary
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.large
  }
};

export default Object.assign({}, container, homeStyles);
