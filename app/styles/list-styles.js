import colors from './components/colors';
import container from './components/container';
import list from './components/list';
import fontSizes from './components/font-sizes';
import padding from './components/padding';

const listStyles = {
  rowContainer: {
    paddingLeft: padding.primary,
    paddingRight: padding.primary
  },
  text: {
    color: colors.secondary,
    fontSize: fontSizes.medium
  }
};

export default Object.assign({}, container, list, listStyles);
