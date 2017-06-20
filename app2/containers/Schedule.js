import React from 'react';
import PropTypes from 'prop-types';
import ScheduleView from '../views/Schedule';
import { findMany, setTimesBy } from '../utils';
import colors from '../styles/_colors';

const ROUTE_KEYS = {
  Thursday: 0,
  Friday: 1,
  Saturday: 2,
  Sunday: 3
};

class ScheduleContainer extends React.Component {
  idx() {
    return ROUTE_KEYS[this.props.navigation.state.key];
  }

  color() {
    return colors.pinWheel[this.idx()];
  }

  render() {
    const idx = this.idx();
    const day = this.props.screenProps.days[idx];
    const setTimes = findMany(this.props.screenProps.set_times, day.set_times);
    const sections = setTimesBy('venue', setTimes, this.props.screenProps);

    const props = {
      sections,
      color: this.color(),
      onNavigate: (url, item) => this.props.navigation.navigate(url, item)
    };

    return <ScheduleView {...props} />;
  }
}

ScheduleContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      key: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  screenProps: PropTypes.shape({
    bands: PropTypes.array.isRequired,
    venues: PropTypes.array.isRequired,
    days: PropTypes.array.isRequired,
    set_times: PropTypes.array.isRequired
  }).isRequired
};

export default ScheduleContainer;
