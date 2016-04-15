import React from 'react-native';
import ToggleSetTime from './toggle-set-time';

import colors from '../../styles/components/colors';
import lodash from 'lodash';
import serializers from '../../data/serializers';
import setTimesByDayStyles from '../../styles/components/set-times-by-day';
import utils from '../../utils';

const Component = React.Component;
const Text = React.Text;
const View = React.View;
const StyleSheet = React.StyleSheet;

const styles = StyleSheet.create(setTimesByDayStyles);

function groupByDay(props) {
  const setTimes = utils.findMany(props.fullSchedule.set_times, props.setTimes);
  return lodash.groupBy(setTimes, 'day');
}

export default class SetTimesByDay extends Component {
  setTime(setTime, color, idx, end) {
    const separator = (idx === end) ? null : <View style={styles.separator}></View>;
    const content = this.props.showBand ? setTime.band.name : setTime.venue.name;

    return (
      <View key={setTime.id}>
        <View style={styles.rowContainer}>
          <Text style={[styles.row, styles.setTime, { color }]} numberOfLines={1}>{utils.formatDate(setTime.startTime)}</Text>
          <Text style={[styles.row, styles.content, { color: colors.secondary }]} numberOfLines={1}>{content}</Text>
          <ToggleSetTime setTime={setTime} style={[styles.row, styles.toggleSetTime, { color }]} />
        </View>
        {separator}
      </View>
    );
  }

  setTimes(setTimes, color) {
    const serialized = serializers.setTimes(setTimes, this.props.fullSchedule);
    const last = serialized.length - 1;
    return <View>{serialized.map((setTime, idx) => this.setTime(setTime, color, idx, last))}</View>;
  }

  days() {
    const days = groupByDay(this.props);
    const dayKeys = lodash.keys(days);
    const dayModels = utils.findMany(this.props.fullSchedule.days, dayKeys);
    const sortedDays = lodash.sortBy(dayModels, 'date');
    const daysColorMap = utils.colorMap(sortedDays.map((day) => day.id));

    return sortedDays.map((day) => {
      const backgroundColor = daysColorMap[day.id];

      return (
        <View key={day.id}>
          <Text style={[styles.sectionHeader, { backgroundColor }]}>{day.name}</Text>
          {this.setTimes(days[day.id], daysColorMap[day.id])}
        </View>
      );
    });
  }

  render() {
    return (
      <View>
        {this.days()}
      </View>
    );
  }
}

SetTimesByDay.propTypes = {
  fullSchedule: React.PropTypes.shape({
    set_times: React.PropTypes.array,
    days: React.PropTypes.array
  }),
  setTimes: React.PropTypes.array,
  showBand: React.PropTypes.bool
};
