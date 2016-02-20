'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { getMany, getOne } from './data/lookup';
import { groupBy } from './utils';

function setTimes(props) {
  const bandSetTimes = getMany(props.fullSchedule.set_times, props.band.set_times);
  return groupBy(bandSetTimes, 'day');
}

export default class Band extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimes: setTimes(this.props)
    }
  }

  setTimes() {
    const days = Object.keys(this.state.setTimes);
    return days.map((dayId) => {
      const day = getOne(this.props.fullSchedule.days, dayId);
      const setTimesToRender = this.state.setTimes[dayId];
      const venues = this.props.fullSchedule.venues;

      function renderSetTimes() {
        return setTimesToRender.map((setTime) => {
          const venue = getOne(venues, setTime.venue);
          return <Text key={setTime.id}>{setTime.start_time} @ {venue.name}</Text>
        });
      }

      return (
        <View key={day.id}>
          <Text>{day.name}</Text>
          {renderSetTimes()}
        </View>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Bio: {this.props.band.description}</Text>
        <Text style={styles.welcome}>Playing On</Text>
        {this.setTimes()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
