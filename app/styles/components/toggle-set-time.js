import utils from '../../utils';
import listStyles from './list';

const containerWrapper = {
  width: listStyles.column.height,
  height: listStyles.column.height,
  backgroundColor: 'transparent'
};

const container = {
  flex: 1,
  justifyContent: 'center'
};

const text = {
  textAlign: 'center',
  fontSize: 30,
  lineHeight: utils.isAndroid() ? 44 : 30,
  fontWeight: '300'
};

export default { containerWrapper, container, text };
