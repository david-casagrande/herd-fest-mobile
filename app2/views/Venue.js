import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import HFContainer from '../components/HFContainer';
import styles from '../styles/views/band';

class VenueView extends React.Component {
  render() {
    return (
      <HFContainer>
        <Text>WUT UP</Text>
      </HFContainer>
    );
  }
}

VenueView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        venue: PropTypes.shape({
          name: PropTypes.string
        }).isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default VenueView;
