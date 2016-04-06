import React from 'react-native';
import ToggleSetTime from './components/toggle-set-time';

import colors from '../styles/components/colors';
import lodash from 'lodash';
import serializers from '../data/serializers';
import utils from '../utils';
import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const Dimensions = React.Dimensions;
const MapView = React.MapView;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;
const ScrollView = React.ScrollView;

const styles = StyleSheet.create(venueStyles);

function linkToGoogleMapsWeb(streetAddress) {
  const addressURL = `https://maps.google.com/?q=${streetAddress}`;
  return utils.link(addressURL);
}

function linkToGoogleMapsApp(streetAddress) {
  const addressURL = `comgooglemaps://?q=${streetAddress}`;
  return utils.link(addressURL).catch(() => linkToGoogleMapsWeb(streetAddress));
}

function venueSetTimesByDay(props) {
  const setTimes = utils.findMany(props.fullSchedule.set_times, props.venue.set_times);
  return lodash.groupBy(setTimes, 'day');
}

export default class Venue extends Component {
  constructor(props) {
    super(props);
    this.state = { streetAddress: `${this.props.venue.street_address}, Buffalo, NY` };
  }

  address() {
    const address = `${this.props.venue.street_address}, Buffalo, NY`;

    return (
      <TouchableOpacity onPress={() => linkToGoogleMapsApp(address)}>
        <Text style={styles.welcome}>{this.props.venue.street_address}</Text>
      </TouchableOpacity>
    );
  }

  setTime(setTime, color, idx, end) {
    const separator = (idx === end) ? null : <View style={styles.separator}></View>;

    return (
      <View key={setTime.id}>
        <View style={styles.rowContainer}>
          <Text style={[styles.row, styles.setTime, { color }]} numberOfLines={1}>{utils.formatDate(setTime.startTime)}</Text>
          <Text style={[styles.row, styles.content, { color: colors.secondary }]} numberOfLines={1}>{setTime.band.name}</Text>
          <ToggleSetTime setTime={setTime} style={[styles.row, styles.toggleSetTime, { color }]} />
        </View>
        {separator}
      </View>
    );
  }

  setTimes(setTimes, color) {
    const serialized = serializers.setTimes(setTimes, this.props.fullSchedule);
    const last = serialized.length - 1;
    return serialized.map((setTime, idx) => this.setTime(setTime, color, idx, last));
  }

  days() {
    const days = venueSetTimesByDay(this.props);
    const dayKeys = lodash.keys(days);
    const daysColorMap = utils.colorMap(dayKeys);

    return dayKeys.map((id) => {
      const day = lodash.find(this.props.fullSchedule.days, { id });
      const backgroundColor = `${daysColorMap[id]}B3`;

      return (
        <View key={id}>
          <Text style={[styles.sectionHeader, { backgroundColor }]}>{day.name}</Text>
          {this.setTimes(days[id], daysColorMap[id])}
        </View>
      );
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.address()}
        {this.days()}
      </ScrollView>
    );
  }
}

Venue.propTypes = {
  venue: React.PropTypes.shape({
    street_address: React.PropTypes.string
  })
};
