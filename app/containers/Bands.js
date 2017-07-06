import React from 'react';
import PropTypes from 'prop-types';
import BandsView from '../views/Bands';
import { sortBy } from 'lodash';

class BandsContainer extends React.Component {
  render() {
    const props = {
      bands: sortBy(this.props.screenProps.bands, ['name']),
      onNavigate: (url, item) => this.props.navigation.navigate(url, item)
    };

    return <BandsView {...props} />;
  }
}

BandsContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  screenProps: PropTypes.shape({
    bands: PropTypes.array.isRequiried
  }).isRequired
};

export default BandsContainer;
