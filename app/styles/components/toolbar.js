import colors from './colors';
import fontSizes from './font-sizes';

const nav = {
  height: 44
};

const navContainer = {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'space-between'
};

const navLink = {
  flex: 1,
  height: 44,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
};

const navText = {
  fontSize: fontSizes.medium,
  color: colors.white
};

export default { nav, navContainer, navLink, navText };
