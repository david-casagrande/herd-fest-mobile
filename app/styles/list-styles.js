import colors from './components/colors';
import container from './components/container';
import list from './components/list';

const listStyles = {
  rowContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: colors.secondary
  }
};

export default Object.assign({}, container, list, listStyles);
