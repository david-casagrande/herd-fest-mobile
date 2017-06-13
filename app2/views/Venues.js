import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';
import HFContainer from '../components/HFContainer';

class VenuesView extends React.Component {
  render() {
    const props = {
      data: this.context.venues,
      keyProp: 'id',
      labelProp: 'name',
      onPress: (item) => this.props.navigation.navigate('Venue', item)
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
