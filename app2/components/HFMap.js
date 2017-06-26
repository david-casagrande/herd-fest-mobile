import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import { link } from '../utils';

function linkToGoogleMapsWeb(streetAddress) {
  const addressURL = `https://maps.google.com/?q=${streetAddress}`;
  return link(addressURL);
}

function linkToGoogleMapsApp(streetAddress) {
  const addressURL = `comgooglemaps://?q=${streetAddress}`;
  return link(addressURL).catch(() => linkToGoogleMapsWeb(streetAddress));
}

class HFMap extends React.Component {
  onPress() {
    const address = `${this.props.address}, Buffalo, NY`;
    return linkToGoogleMapsApp(address);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <Text>{this.props.label}</Text>
      </TouchableOpacity>
    );
  }
}

HFMap.propTypes = {
  address: PropTypes.string.isRequired,
  label: PropTypes.string,
};

HFMap.defaultProps = {
  label: 'Map'
};

export default HFMap;
