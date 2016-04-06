import colors from './components/colors';
import container from './components/container';
import fontSizes from './components/font-sizes';
import list from './components/list';
import padding from './components/padding';
import setTimeRow from './components/set-time-row';

const smallerFontSize = 12;

const scheduleStyles = {
  message: {
    fontSize: 24,
    textAlign: 'center',
    color: colors.primary,
    padding: padding.primary
  },

  band: {
    color: colors.secondary,
    fontSize: fontSizes.medium
  },

  venue: {
    color: colors.primary,
    fontSize: fontSizes.medium
  }
};

export default Object.assign(scheduleStyles, container, list, setTimeRow);
