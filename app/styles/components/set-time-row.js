import colors from './colors';
import fontSizes from './font-sizes';

const setTime = {
  width: 78
};

const setTimeText = {
  color: colors.primary,
  textAlign: 'center',
  fontSize: fontSizes.medium
};

const content = {
  flex: 1,
  justifyContent: 'center',
  marginLeft: 2
};

const contentText = {
  color: colors.secondary,
  fontSize: fontSizes.medium,
  textAlign: 'left'
};

const toggleSetTime = {
  color: colors.primary
};

export default { setTime, content, contentText, toggleSetTime, setTimeText };
