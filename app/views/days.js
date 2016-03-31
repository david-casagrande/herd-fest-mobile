import React from 'react-native';
import DayList from './day-list';

import daysStyles from '../styles/days-styles';
import lodash from 'lodash';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

const styles = StyleSheet.create(daysStyles);

export default class Days extends Component {
  constructor(props) {
    super(props)

    const day = lodash.sortBy(this.props.fullSchedule.days, ['date'])[0];
    this.state = { day }
  }

  setDay(day) {
    this.setState({ day: day });
  }

  days() {
    const sorted = lodash.sortBy(this.props.fullSchedule.days, ['date']);

    return sorted.map((day) => {
      const active = (day === this.state.day);
      const dayLinkStyles = active ? [styles.dayLink, styles.dayLinkActive] : styles.dayLink;
      const dayTextStyles = active ? [styles.dayText, styles.dayTextActive] : styles.dayText;

      return (
        <TouchableOpacity key={day.id} style={dayLinkStyles} onPress={(() => this.setDay(day))}>
          <Text style={dayTextStyles}>{day.name.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View><View style={styles.days}>{this.days()}</View></View>
        <DayList navigator={this.props.navigator} fullSchedule={this.props.fullSchedule} day={this.state.day} />
      </View>
    );
  }
}

Days.propTypes = {
  navigator: React.PropTypes.object,
  fullSchedule: React.PropTypes.object
};
