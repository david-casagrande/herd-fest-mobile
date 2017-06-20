import React from 'react';
import PropTypes from 'prop-types';
import BandView from '../views/Band';

class BandContainer extends React.Component {
  render() {
    const props = {
      band: this.props.navigation.state.params
    };

    return <BandView {...props} />;
  }
}

BandContainer.propTypes = {
  navigation: PropTypes.shape({
    // navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.object.isRequired
    }).isRequired
  }).isRequired
};

export default BandContainer;
