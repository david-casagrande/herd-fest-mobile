import colors from './colors';
import utils from '../../utils';

const androidPadding = 56;
const iosPadding = 64;

const container = {
  backgroundColor: colors.white,
  flex: 1,
  paddingTop: utils.isAndroid() ? androidPadding : iosPadding
};

const centered = {
  alignItems: 'center',
  justifyContent: 'center'
};

export default { container, centered };
