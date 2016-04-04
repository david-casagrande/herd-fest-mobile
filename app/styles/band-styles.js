import colors from './components/colors';
import container from './components/container';
import list from './components/list';
import setTimeRow from './components/set-time-row';

const bandDetailPadding = 10;

const bandStyles = {
  image: {
    height: 200
  },
  bandDetail: {
    padding: bandDetailPadding
  },
  bandName: {
    color: colors.primary,
    fontSize: 16,
    paddingTop: 2,
    fontWeight: 'bold'
  },
  text: {
    color: colors.secondary,
    fontSize: 14,
    paddingBottom: bandDetailPadding
  }
};

export default Object.assign(bandStyles, container, setTimeRow, list);
