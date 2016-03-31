import container from './components/container';
import list from './components/list';
import setTimeRow from './components/set-time-row';
import colors from './components/colors';

const listStyles = {
  rowContainer: {
    paddingLeft: 10,
    paddingRight: 10
  }
};

export default Object.assign({}, container, list, setTimeRow, listStyles);
