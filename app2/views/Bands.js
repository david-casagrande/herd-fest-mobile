import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';
import HFContainer from '../components/HFContainer';
import { sortBy } from 'lodash';

class BandsView extends React.Component {
  render() {
    const props = {
      data: sortBy(this.context.bands, ['name']),
      keyProp: 'id',
      labelProp: 'name',
      onPress: (item) => this.props.navigation.navigate('Band', { band: item })
    };

    return (
      <HFContainer>
        <HFFlatList {...props} />
      </HFContainer>
    );
  }
}

BandsView.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

BandsView.contextTypes = {
  bands: PropTypes.array.isRequired
};

export default BandsView;
