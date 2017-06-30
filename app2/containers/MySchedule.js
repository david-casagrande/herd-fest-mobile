import React from 'react';
import PropTypes from 'prop-types';
import MyScheduleView from '../views/MySchedule';
import { get } from '../data/my-schedule';
import { findMany, setTimesBy } from '../utils';

class MyScheduleContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mySchedule: []
    };
  }

  componentDidMount() {
    this.setup();
  }

  setup() {
    return get().then((mySchedule) => this.setState({ mySchedule }));
  }

  render() {
    const setTimes = findMany(this.props.screenProps.set_times, this.state.mySchedule);
    const sections = setTimesBy('day', setTimes, this.props.screenProps);

    const props = {
      sections,
      onNavigate: (url, item) => this.props.navigation.navigate(url, item)
    };

    return <MyScheduleView sections={sections} />;
  }
}

MyScheduleContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  screenProps: PropTypes.shape({
    bands: PropTypes.array.isRequired,
    venues: PropTypes.array.isRequired,
    days: PropTypes.array.isRequired,
    set_times: PropTypes.array.isRequired
  }).isRequired
};

export default MyScheduleContainer;
