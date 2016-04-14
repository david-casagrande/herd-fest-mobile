import React from 'react-native';

import utils from '../../utils';

const Component = React.Component;
const TouchableOpacity = React.TouchableOpacity;

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
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

MapAddress.propTypes = {
  address: React.PropTypes.string.isRequired,
  children: React.PropTypes.array
};
