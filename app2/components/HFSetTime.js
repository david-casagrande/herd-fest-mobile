import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { formatDate } from '../utils';
import HFScheduleManager from './HFScheduleManager';
import styles from '../styles/hf-set-time';

class HFSetTime extends React.Component {
  textWithVenue() {
    const { tintColor } = this.props;
    const venueStyle = [styles.labelTextSecondary];

    if (tintColor) {
      venueStyle.push({ color: tintColor });
    }

    return (
      <View>
        <Text style={venueStyle} data-id="venue">{this.props.setTime.venue.name}</Text>
        <Text style={styles.labelTextSecondary} data-id="band">{this.props.setTime.band.name}</Text>
      </View>
    );
  }

  text() {
    return <Text style={styles.labelText} data-id="band">{this.props.setTime.band.name}</Text>;
  }

  name() {
    return (
      <View style={styles.label}>
        {this.props.showVenue ? this.textWithVenue() : this.text()}
      </View>
    );
  }

  nameTouchable() {
    return (
      <TouchableOpacity style={styles.label} onPress={() => this.props.onPress(this.props.setTime)}>
        {this.props.showVenue ? this.textWithVenue() : this.text()}
      </TouchableOpacity>
    );
  }

  render() {
    const startTimeStyles = [styles.startTime];
    const { tintColor } = this.props;

    if (tintColor) {
      startTimeStyles.push({ color: tintColor });
    }

    return (
      <View style={styles.container}>
        <Text style={startTimeStyles} data-id="start-time">{formatDate(this.props.setTime.start_time)}</Text>
        {this.props.onPress ? this.nameTouchable() : this.name()}
        <HFScheduleManager setTime={this.props.setTime} tintColor={this.props.tintColor} />
      </View>
    );
  }
}

HFSetTime.propTypes = {
  setTime: PropTypes.shape({
    start_time: PropTypes.string.isRequired,
    band: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  onPress: PropTypes.func,
  tintColor: PropTypes.string,
  showVenue: PropTypes.bool
};

export default HFSetTime;
