import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';
import HFContainer from '../components/HFContainer';

class BandsView extends React.Component {
  render() {
    const props = {
      data: this.context.bands,
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
