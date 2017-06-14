import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/hf-day-navigator';
import colors from '../styles/_colors';

class HFDayTabBar extends React.Component {
  color() {
    return colors.pinWheel[this.props.navigation.state.index];
  }

  route(route, idx) {
    const { jumpToIndex } = this.props;
    const color = this.color();
    const focused = (idx === this.props.navigation.state.index);
    const dayStyle = [styles.day, { borderColor: color }];
    const textStyle = [styles.text, { color }];

    if (focused) {
      dayStyle.push({ backgroundColor: color });
      textStyle.push(styles.textActive);
    }

    return (
      <View key={route.routeName} style={dayStyle} data-id="day">
        <TouchableOpacity onPress={() => jumpToIndex(idx)} style={styles.link}>
          <Text style={textStyle}>{route.routeName.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  routes() {
    const { routes } = this.props.navigation.state;
    return routes.map((route, idx) => this.route(route, idx));
  }

  render() {
    const containerStyle = [styles.container, { borderColor: this.color() }];

    return (
      <View style={containerStyle}>
        <View style={styles.content}>
          {this.routes()}
        </View>
      </View>
    );
  }
}

HFDayTabBar.propTypes = {
  jumpToIndex: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routeName: PropTypes.string.isRequired,
      routes: PropTypes.array.isRequired
    }).isRequired,
  }).isRequired
};

export default HFDayTabBar;
