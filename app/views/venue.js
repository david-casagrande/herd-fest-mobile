import React from 'react-native';

import lodash from 'lodash';
import lookup from '../data/lookup';
import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const Linking = React.Linking;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

function setTimes(props) {
  const venueSetTimes = lookup.getMany(props.fullSchedule.set_times, props.venue.set_times);
  return lodash.groupBy(venueSetTimes, 'day');
}

// move to utils
function link(url) {
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return url;
    }
    return Linking.openURL(url);
  }).catch((linkingError) => linkingError);
}

const styles = StyleSheet.create(venueStyles);

export default class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      setTimes: setTimes(this.props)
    };
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
          return <Text key={setTime.id}>{setTime.start_time} @ {venue.name}</Text>;
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
    const addressURL = `https://maps.google.com/?q=${this.props.venue.street_address}, Buffalo, NY`;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => link(addressURL)}>
          <Text style={styles.welcome}>{this.props.venue.street_address}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
