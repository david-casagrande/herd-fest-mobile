import React from 'react-native';

import fullSchedule from './data/full-schedule';
import homeStyles from './styles/home-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

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

  renderDay(day) {
    return (
      <TouchableOpacity key={day.id} onPress={() => this.goToDay(day)}>
        <Text>{day.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const days = this.state.fullSchedule.days.sort((l, r) => l.name > r.name).map((day) => this.renderDay(day));

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcome}>HERD FEST</Text>
          {days}
        </View>
        <View style={styles.nav}>
          <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => this.props.navigator.push({ name: 'Schedule', index: 1, title: 'My Schedule' })} style={[styles.navLink, { backgroundColor: 'purple' }]}>
              <Text style={styles.navText}>My Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigator.push({ name: 'Schedule', index: 1, title: 'My Schedule' })} style={[styles.navLink, { backgroundColor: 'green' }]}>
              <Text style={styles.navText}>Bands</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigator.push({ name: 'Schedule', index: 1, title: 'My Schedule' })} style={[styles.navLink, { backgroundColor: 'blue' }]}>
              <Text style={styles.navText}>Venues</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
