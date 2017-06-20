import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
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
  venue: PropTypes.shape({
    set_times: PropTypes.array.isRequired
  }).isRequired
};

export default VenueView;
