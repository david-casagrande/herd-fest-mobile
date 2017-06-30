import colors from './_colors';
import fontSizes from './_font-sizes';
import { StyleSheet } from 'react-native';

const HEIGHT = 34;
const BORDER_WIDTH = 2;

const container = {
  backgroundColor: colors.white,
  borderColor: colors.primary,
  borderTopWidth: BORDER_WIDTH,
  borderBottomWidth: BORDER_WIDTH,
  height: HEIGHT
};

const content = {
  flexGrow: 1,
  flexDirection: 'row'
};

const day = {
  borderColor: colors.primary,
  borderLeftWidth: BORDER_WIDTH,
  flex: 1
};

const dayFirst = {
  borderColor: 'transparent',
};

const link = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
};

const text = {
  fontSize: fontSizes.verySmall,
  color: colors.primary,
  fontWeight: 'bold'
};

const textActive = {
  color: colors.white
};

export default StyleSheet.create({ container, content, day, dayFirst, link, text, textActive });
