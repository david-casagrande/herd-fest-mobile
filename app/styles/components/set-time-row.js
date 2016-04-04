import colors from './colors';
import fontSizes from './font-sizes';

const setTime = {
  width: 74,
  color: colors.primary,
  textAlign: 'center',
  fontSize: fontSizes.medium
};

const venue = {
  width: 80,
  color: colors.secondary,
  fontSize: fontSizes.medium
};

const content = {
  flex: 1,
  paddingLeft: 2,
  color: colors.secondary,
  fontSize: fontSizes.medium
};

const toggleSetTime = {
  backgroundColor: 'transparent',
  width: 37,
  height: 37,
  lineHeight: 20,
  fontSize: 22,
  textAlign: 'center',
  color: colors.primary
};

export default { setTime, content, toggleSetTime, venue };
