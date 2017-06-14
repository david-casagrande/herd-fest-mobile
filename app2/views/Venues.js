import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';
import HFContainer from '../components/HFContainer';
import { sortBy } from 'lodash';

class VenuesView extends React.Component {
  render() {
    const props = {
      data: sortBy(this.context.venues, ['name']),
      keyProp: 'id',
      labelProp: 'name',
      onPress: (item) => this.props.navigation.navigate('Venue', { venue: item })
    };

    return (
      <HFContainer>
        <HFFlatList {...props} />
      </HFContainer>
    );
  }
}

VenuesView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

VenuesView.contextTypes = {
  venues: PropTypes.array.isRequired
};

export default VenuesView;
