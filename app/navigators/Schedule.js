import { TabNavigator } from 'react-navigation';
import HFDayTabBar from '../components/HFDayTabBar';
import ScheduleContainer from '../containers/Schedule';

const OPTIONS = {
  backBehavior: 'none',
  tabBarComponent: HFDayTabBar,
  tabBarPosition: 'top'
};

const ScheduleNavigator = TabNavigator({
  Thursday: {
    screen: ScheduleContainer
  },
  Friday: {
    screen: ScheduleContainer
  },
  Saturday: {
    screen: ScheduleContainer
  },
  Sunday: {
    screen: ScheduleContainer
  }
}, OPTIONS);

export default ScheduleNavigator;
