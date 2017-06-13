import React from 'react';
import PropTypes from 'prop-types';
import HFFlatList from '../components/HFFlatList';

class BandsView extends React.Component {
  render() {
    const props = {
      data: this.context.bands,
      keyProp: 'id',
      labelProp: 'name',
      onPress: (item) => this.props.navigation.navigate('Band', item)
    };

    return <HFFlatList {...props} />;
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
