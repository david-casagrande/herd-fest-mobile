import colors from './colors';
import fontSizes from './font-sizes';

const setTime = {
  width: 74,
  color: colors.primary,
  textAlign: 'center',
  fontSize: fontSizes.medium
};

const content = {
  flex: 1,
  paddingLeft: 2,
  color: colors.secondary,
  fontSize: fontSizes.medium
};

const toggleSetTime = {
  // backgroundColor: '#eee',
  width: 40,
  textAlign: 'center',
  color: colors.primary
};

export default { setTime, content, toggleSetTime };
