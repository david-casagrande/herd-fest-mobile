import React from 'react-native';
import SetTimesByDay from './components/set-times-by-day';

import utils from '../utils';
import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
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

export default class Venue extends Component {
  address() {
    const address = `${this.props.venue.street_address}, Buffalo, NY`;

    return (
      <TouchableOpacity onPress={() => linkToGoogleMapsApp(address)}>
        <Text style={styles.welcome}>{this.props.venue.street_address}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.address()}
        <SetTimesByDay fullSchedule={this.props.fullSchedule} setTimes={this.props.venue.set_times} showBand={true} />
      </ScrollView>
    );
  }
}

Venue.propTypes = {
  venue: React.PropTypes.shape({
    street_address: React.PropTypes.string,
    set_times: React.PropTypes.array
  }),
  fullSchedule: React.PropTypes.object
};
