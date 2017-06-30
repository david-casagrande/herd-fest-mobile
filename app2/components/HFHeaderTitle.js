import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import style from '../styles/hf-header-title';

class HFHeaderTitle extends React.Component {
  render() {
    return (
      <View>
        <Text style={style.sub}>{this.props.sub}</Text>
        <Text style={style.title}>{this.props.title}</Text>
      </View>
    );
  }
}

HFHeaderTitle.propTypes = {
  title: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired
};

export default HFHeaderTitle;
