import React from 'react-native';

import colors from './components/colors';
import container from './components/container';
import fontSizes from './components/font-sizes';
import padding from './components/padding';
import utils from '../utils';

const offset = utils.isAndroid() ? 100 : 80;
const width = React.Dimensions.get('window').width - offset;
const paddingTop = utils.isAndroid() ? 0 : 10;

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
