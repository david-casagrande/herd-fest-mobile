import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';
import HFContainer from '../components/HFContainer';
import { sortBy } from 'lodash';

class VenuesView extends React.Component {
  render() {
    const props = {
      data: sortBy(this.props.venues, ['name']),
      keyProp: 'id',
      labelProp: 'name',
      onPress: (item) => this.props.onNavigate('Venue', item)
    };

    return (
      <HFContainer>
        <HFFlatList {...props} />
      </HFContainer>
    );
  }
}

VenuesView.propTypes = {
  onNavigate: PropTypes.func.isRequired,
  venues: PropTypes.array.isRequired
};

export default VenuesView;
