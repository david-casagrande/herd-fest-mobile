import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/hf-flat-list';

function Separator() {
  return <View style={styles.separator} />;
}

class HFFlatList extends React.Component {
  item({ item }) {
    return (
      <TouchableOpacity onPress={() => this.props.onPress(item)} style={styles.item}>
        <Text style={styles.label}>{item[this.props.labelProp]}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const props = {
      data: this.props.data,
      keyExtractor: (item) => item[this.props.keyProp],
      renderItem: (info) => this.item(info),
      ItemSeparatorComponent: Separator
    };

    return <FlatList {...props} />;
  }
}

HFFlatList.propTypes = {
  data: PropTypes.array.isRequired,
  keyProp: PropTypes.string.isRequired,
  labelProp: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

export default HFFlatList;
