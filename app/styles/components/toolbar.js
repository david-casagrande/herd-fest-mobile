import colors from './colors';

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
  fontSize: 14,
  color: colors.white
};

export default { nav, navContainer, navLink, navText };
