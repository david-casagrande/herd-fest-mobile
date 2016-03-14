import container from './components/container';
import list from './components/list';
import setTimeRow from './components/set-time-row';

const scheduleStyles = {
  message: {
    fontSize: 24,
    textAlign: 'center'
  }
};

export default Object.assign(scheduleStyles, container, list, setTimeRow);
