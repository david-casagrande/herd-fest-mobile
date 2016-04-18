import DayList from './day-list';
import React from 'react-native';

import daysStyles from '../styles/days-styles';
import lodash from 'lodash';
import moment from 'moment';
import utils from '../utils';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

const styles = StyleSheet.create(daysStyles);

function currentDay(days) {
  const date = new Date();
  const today = moment.utc(date).format('YYYY-MM-DD');

  return lodash.find(days, (day) => day.date === today);
}

function initialState(props) {
  const today = currentDay(props.fullSchedule.days);
  const sorted = lodash.sortBy(props.fullSchedule.days, 'date');

  return {
    day: today ? today : sorted[0],
    colorMap: utils.colorMap(sorted.map((day) => day.id))
  };
}

export default class Days extends Component {
  constructor(props) {
    super(props);

    this.state = initialState(props);
  }

  setDay(day) {
    this.setState({ day });
  }

  days() {
    const sorted = lodash.sortBy(this.props.fullSchedule.days, 'date');
    const activeColor = this.state.colorMap[this.state.day.id];

    return sorted.map((day) => {
      const active = (day === this.state.day);
      const dayLinkStyles = active ? [styles.dayLink, styles.dayLinkActive, { backgroundColor: activeColor }] : styles.dayLink;
      const dayTextStyles = active ? [styles.dayText, styles.dayTextActive] : [styles.dayText, { color: activeColor }];

      return (
        <TouchableOpacity key={day.id} style={[dayLinkStyles, { borderColor: activeColor }]} onPress={(() => this.setDay(day))}>
          <Text style={dayTextStyles}>{day.name.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View><View style={styles.days}>{this.days()}</View></View>
        <DayList
          navigator={this.props.navigator}
          fullSchedule={this.props.fullSchedule}
          day={this.state.day}
          color={this.state.colorMap[this.state.day.id]}
        />
      </View>
    );
  }
}

Days.propTypes = {
  navigator: React.PropTypes.object,
  fullSchedule: React.PropTypes.object
};
