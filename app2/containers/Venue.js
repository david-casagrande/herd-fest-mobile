import React from 'react';
import PropTypes from 'prop-types';
import VenueView from '../views/Venue';

class VenueContainer extends React.Component {
  render() {
    const props = {
      venue: this.props.navigation.state.params
    };

    return <VenueView {...props} />;
  }
}

VenueContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default VenueContainer;
