import utils from '../utils';
import colors from './_colors';
import { StyleSheet } from 'react-native';

const ANDROID_LINE_HEIGHT = 44;
const IOS_LINE_HEIGHT = 32;

const container = {
  width: 50,
  height: 50,
  backgroundColor: 'transparent'
};

const content = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
};

const text = {
  color: colors.primary,
  fontSize: 30,
  fontWeight: '300',
  lineHeight: utils.isAndroid() ? ANDROID_LINE_HEIGHT : IOS_LINE_HEIGHT
};

const textRotate = {
  transform: [{ rotate: '45deg' }]
};

export default StyleSheet.create({ container, content, text, textRotate });
