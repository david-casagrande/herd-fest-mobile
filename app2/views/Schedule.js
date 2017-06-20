import React from 'react';
import PropTypes from 'prop-types';
import HFContainer from '../components/HFContainer';
import HFSectionList from '../components/HFSectionList';
import HFSetTime from '../components/HFSetTime';
import HFDayTabBar from '../components/HFDayTabBar';
import { TabNavigator } from 'react-navigation';
import { findMany, setTimesBy } from '../utils';
import colors from '../styles/_colors';

const ROUTE_KEYS = {
  Thursday: 0,
  Friday: 1,
  Saturday: 2,
  Sunday: 3
};

class Day extends React.Component {
  idx() {
    return ROUTE_KEYS[this.props.navigation.state.key];
  }

  color() {
    return colors.pinWheel[this.idx()];
  }

  render() {
    const idx = this.idx();
    const day = this.context.days[idx];
    const setTimes = findMany(this.context.set_times, day.set_times);
    const sections = setTimesBy('venue', setTimes, this.context);
    const color = this.color();

    return (
      <HFContainer>
        <HFSectionList
          sections={sections}
          renderItem={({ item }) => <HFSetTime setTime={item} tintColor={color} />}
          renderSectionHeader={({ section }) => section.name}
          keyProp="id"
          onPress={(venue) => this.props.navigation.navigate('Venue', { venue })}
          tintColor={color}
        />
      </HFContainer>
    );
  }
}

Day.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

Day.contextTypes = {
  days: PropTypes.array.isRequired,
  venues: PropTypes.array.isRequired,
  set_times: PropTypes.array.isRequired,
  bands: PropTypes.array.isRequired
};

const OPTIONS = {
  backBehavior: 'none',
  tabBarComponent: HFDayTabBar,
  tabBarPosition: 'top'
};

const ScheduleView = TabNavigator({
  Thursday: {
    screen: Day
  },
  Friday: {
    screen: Day
  },
  Saturday: {
    screen: Day
  },
  Sunday: {
    screen: Day
  }
}, OPTIONS);

export default ScheduleView;
