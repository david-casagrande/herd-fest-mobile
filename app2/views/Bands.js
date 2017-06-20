import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';
import HFContainer from '../components/HFContainer';
import { sortBy } from 'lodash';

class BandsView extends React.Component {
  render() {
    const props = {
      data: sortBy(this.props.bands, ['name']),
      keyProp: 'id',
      labelProp: 'name',
      onPress: (item) => this.props.onNavigate('Band', item)
    };

    return (
      <HFContainer>
        <HFFlatList {...props} />
      </HFContainer>
    );
  }
}

BandsView.propTypes = {
  bands: PropTypes.array.isRequired,
  onNavigate: PropTypes.func.isRequired
};

export default BandsView;
