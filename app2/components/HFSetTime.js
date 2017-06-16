import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { formatDate } from '../utils';
import HFScheduleManager from './HFScheduleManager';
import styles from '../styles/hf-set-time';

class HFSetTime extends React.Component {
  render() {
    const startTimeStyles = [styles.startTime];

    if (this.props.tintColor) {
      startTimeStyles.push({ color: this.props.tintColor });
    }

    return (
      <View style={styles.container}>
        <Text style={startTimeStyles} data-id="start-time">{formatDate(this.props.setTime.startTime)}</Text>
        <Text style={styles.label} data-id="band">{this.props.setTime.band.name}</Text>
        <HFScheduleManager />
      </View>
    );
  }
}

HFSetTime.propTypes = {
  setTime: PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    band: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  tintColor: PropTypes.string
};

export default HFSetTime;
