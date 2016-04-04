import React from 'react-native';
import ToggleSetTime from './components/toggle-set-time';

import bandStyles from '../styles/band-styles';
import colors from '../styles/components/colors';
import lodash from 'lodash';
import serializers from '../data/serializers';
import utils from '../utils';

const Component = React.Component;
const Image = React.Image;
const ScrollView = React.ScrollView;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const View = React.View;

const styles = StyleSheet.create(bandStyles);

function bandSetTimesByDay(props) {
  const setTimes = utils.findMany(props.fullSchedule.set_times, props.band.set_times);
  return lodash.groupBy(setTimes, 'day');
}

function colorMap(collection) {
  const map = {};
  let count = 0;

  collection.forEach((key) => {
    if (typeof map[key] !== 'undefined') {
      return;
    }

    map[key] = colors.pinWheel[count];
    count++;
  });

  return map;
}

export default class Band extends Component {
  setTime(setTime, color, idx, end) {
    const separator = (idx === end) ? null : <View style={styles.separator}></View>;

    return (
      <View key={setTime.id}>
        <View style={styles.rowContainer}>
          <Text style={[styles.row, styles.setTime, { color }]} numberOfLines={1}>{utils.formatDate(setTime.startTime)}</Text>
          <Text style={[styles.row, styles.content, { color: colors.secondary }]} numberOfLines={1}>{setTime.venue.name}</Text>
          <ToggleSetTime setTime={setTime} style={[styles.row, styles.toggleSetTime]} />
        </View>
        {separator}
      </View>
    );
  }

  setTimes(setTimes, color) {
    const serialized = serializers.setTimes(setTimes, this.props.fullSchedule);
    const last = serialized.length - 1;
    return serialized.map((setTime, idx) => this.setTime(setTime, color, idx, last));
  }

  days() {
    const days = bandSetTimesByDay(this.props);
    const dayKeys = lodash.keys(days);
    const daysColorMap = colorMap(dayKeys);

    return dayKeys.map((id) => {
      const day = lodash.find(this.props.fullSchedule.days, { id });
      const backgroundColor = `${daysColorMap[id]}B3`;

      return (
        <View key={id}>
          <Text style={[styles.sectionHeader, { backgroundColor }]}>{day.name}</Text>
          {this.setTimes(days[id], daysColorMap[id])}
        </View>
      );
    });
  }

  image() {
    if (!this.props.band.image_url) {
      return null;
    }

    return (
      <Image
        source={{ uri: this.props.band.image_url }}
        style={styles.image}
        resizeMode={'cover'}
      />
    );
  }

  description() {
    if (!this.props.band.description) {
      return null;
    }

    return <Text style={styles.text}>{this.props.band.description}</Text>;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.image()}
        <View style={styles.bandDetail}>
          <Text style={[styles.text, styles.bandName]}>{this.props.band.name}</Text>
          {this.description()}
        </View>
        {this.days()}
      </ScrollView>
    );
  }
}

Band.propTypes = {
  band: React.PropTypes.shape({
    description: React.PropTypes.string,
    image_url: React.PropTypes.string,
    name: React.PropTypes.string
  }),
  fullSchedule: React.PropTypes.object
};
