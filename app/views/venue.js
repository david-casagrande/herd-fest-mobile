import React from 'react-native';

import lodash from 'lodash';
import utils from '../utils';
import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const Linking = React.Linking;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

function setTimes(props) {
  const venueSetTimes = utils.findMany(props.fullSchedule.set_times, props.venue.set_times);
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
    const days = lodash.keys(this.state.setTimes);
    return days.map((id) => {
      const day = lodash.find(this.props.fullSchedule.days, { id });
      const setTimesToRender = this.state.setTimes[id];
      const venues = this.props.fullSchedule.venues;

      function renderSetTimes() {
        return setTimesToRender.map((setTime) => {
          const venue = lodash.find(venues, { id: setTime.venue });
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
