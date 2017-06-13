import colors from './_colors';
import { StyleSheet } from 'react-native';

const item = {
  backgroundColor: colors.white,
  height: 52,
  flex: 1,
  justifyContent: 'center'
};

const separator = {
  backgroundColor: colors.lightGrey,
  height: StyleSheet.hairlineWidth
};

const label = {
  color: colors.secondary
};

export default { item, separator, label };
