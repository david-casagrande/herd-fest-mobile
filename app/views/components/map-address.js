import React from 'react-native';

import utils from '../../utils';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

function linkToGoogleMapsWeb(streetAddress) {
  const addressURL = `https://maps.google.com/?q=${streetAddress}`;
  return utils.link(addressURL);
}

function linkToGoogleMapsApp(streetAddress) {
  const addressURL = `comgooglemaps://?q=${streetAddress}`;
  return utils.link(addressURL).catch(() => linkToGoogleMapsWeb(streetAddress));
}

export default class MapAddress extends Component {
  render() {
    const address = `${this.props.address}, Buffalo, NY`;

    return (
      <TouchableOpacity onPress={() => linkToGoogleMapsApp(address)}>
        <Text style={this.props.style || []}>Map</Text>
      </TouchableOpacity>
    );
  }
}

MapAddress.propTypes = {
  address: React.PropTypes.string,
  style: React.PropTypes.array
};
