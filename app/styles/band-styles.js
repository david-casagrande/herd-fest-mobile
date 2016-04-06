import colors from './components/colors';
import container from './components/container';
import fontSizes from './components/font-sizes';
import list from './components/list';
import padding from './components/padding';
import setTimeRow from './components/set-time-row';

const bandStyles = {
  image: {
    height: 200
  },
  bandDetail: {
    padding: padding.primary
  },
  bandName: {
    color: colors.secondary,
    fontSize: fontSizes.large,
    paddingTop: 2,
    fontWeight: 'bold'
  },
  text: {
    color: colors.secondary,
    fontSize: fontSizes.medium,
    paddingBottom: padding.primary
  }
};

export default Object.assign(bandStyles, container, setTimeRow, list);
