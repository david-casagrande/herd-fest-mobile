import React from 'react';
import PropTypes from 'prop-types';
import VenuesView from '../views/Venues';

class VenuesContainer extends React.Component {
  render() {
    const props = {
      venues: this.props.screenProps.venues,
      onNavigate: (url, item) => this.props.navigation.navigate(url, item)
    };

    return <VenuesView {...props} />;
  }
}

VenuesContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  screenProps: PropTypes.shape({
    venues: PropTypes.array.isRequiried
  }).isRequired
};

export default VenuesContainer;
