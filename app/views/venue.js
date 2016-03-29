import React from 'react-native';

import utils from '../utils';
import venueStyles from '../styles/venue-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

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
  constructor(props) {
    super(props);
    this.state = { streetAddress: `${this.props.venue.street_address}, Buffalo, NY` };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => linkToGoogleMapsApp(this.state.streetAddress)}>
          <Text style={styles.welcome}>{this.props.venue.street_address}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Venue.propTypes = {
  venue: React.PropTypes.shape({
    street_address: React.PropTypes.string
  })
};
