'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity
} from 'react-native';

import lookup from './data/lookup';
import utils from './utils';

function setTimes(props) {
  const venueSetTimes = lookup.getMany(props.fullSchedule.set_times, props.venue.set_times);
  return utils.groupBy(venueSetTimes, 'day');
}

function link(url) {
  Linking.canOpenURL(url).then(supported => {
    if (!supported) {
      console.log('Can\'t handle url: ' + url);
    } else {
      return Linking.openURL(url);
    }
  }).catch(err => console.error('An error occurred', err));
}

export default class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimes: setTimes(this.props)
    }
  }

  setTimes() {
    const days = Object.keys(this.state.setTimes);
    return days.map((dayId) => {
      const day = lookup.getOne(this.props.fullSchedule.days, dayId);
      const setTimesToRender = this.state.setTimes[dayId];
      const venues = this.props.fullSchedule.venues;

      function renderSetTimes() {
        return setTimesToRender.map((setTime) => {
          const venue = lookup.getOne(venues, setTime.venue);
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
    const addressURL = 'https://maps.google.com/?q=' + this.props.venue.street_address + ', Buffalo, NY';

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => link(addressURL)}>
          <Text style={styles.welcome}>{this.props.venue.street_address}</Text>
        </TouchableOpacity>
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
    paddingTop: 64
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    height: 200
  }
});
