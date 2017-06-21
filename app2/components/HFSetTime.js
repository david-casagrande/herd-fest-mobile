import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatDate } from '../utils';
import HFScheduleManager from './HFScheduleManager';
import styles from '../styles/hf-set-time';

class HFSetTime extends React.Component {
  text() {
    return <Text style={styles.labelText} data-id="band">{this.props.setTime.band.name}</Text>;
  }

  name() {
    return (
      <View style={styles.label}>
        {this.text()}
      </View>
    );
  }

  nameTouchable() {
    return (
      <TouchableOpacity style={styles.label} onPress={() => this.props.onPress(this.props.setTime)}>
        {this.text()}
      </TouchableOpacity>
    );
  }

  render() {
    const startTimeStyles = [styles.startTime];

    if (this.props.tintColor) {
      startTimeStyles.push({ color: this.props.tintColor });
    }

    return (
      <View style={styles.container}>
        <Text style={startTimeStyles} data-id="start-time">{formatDate(this.props.setTime.start_time)}</Text>
        {this.props.onPress ? this.nameTouchable() : this.name()}
        <HFScheduleManager />
      </View>
    );
  }
}

HFSetTime.propTypes = {
  setTime: PropTypes.shape({
    start_time: PropTypes.string.isRequired,
    band: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onPress: PropTypes.func,
  tintColor: PropTypes.string
};

export default HFSetTime;
