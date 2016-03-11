import React from 'react-native';

const Component = React.Component;
const StyleSheet = React.StyleSheet
const Text = React.Text
const TouchableOpacity = React.TouchableOpacity
const View = React.View

import fullSchedule from './data/full-schedule';
import homeStyles from './styles/home-styles';

const styles = StyleSheet.create(homeStyles);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullSchedule: { bands: [], venues: [], set_times: [], days: [] }
    };
    this.setFullSchedule();
  }

  setFullSchedule() {
    fullSchedule.get().then((json) => {
      this.setState({ fullSchedule: json });
    });
  }

  goToDay(day) {
    this.props.navigator.push({ name: 'Day', index: 1, title: day.name, day_id: day.id });
  }

  render() {
    const days = this.state.fullSchedule.days.sort((l, r) => l.name > r.name).map((day) => {
      return (
        <TouchableOpacity key={day.id} onPress={() => this.goToDay(day)}>{day.name}>
          <Text>{day.name}</Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>HERD FEST</Text>
        {days}
      </View>
    );
  }
}
