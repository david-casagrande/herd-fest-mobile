import { StyleSheet } from 'react-native';
import colors from './_colors';

const container = {
  position: 'relative',
  flex: 1
};

const image = {
  position: 'absolute',
  backgroundColor: colors.veryLightGrey,
  width: '100%'
};

export default StyleSheet.create({ container, image });
