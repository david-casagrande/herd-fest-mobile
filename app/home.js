import React from 'react-native';

import homeStyles from './styles/home-styles';
import lodash from 'lodash';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(homeStyles);

export default class Home extends Component {
  goToDay(day) {
    this.props.navigator.push({ name: 'Day', index: 1, title: day.name, day_id: day.id });
  }

  renderDays() {
    const days = lodash.sortBy(this.props.fullSchedule.days, ['name']);

    return days.map((day) => { // eslint-disable-line arrow-body-style
      return (
        <TouchableOpacity key={day.id} onPress={() => this.goToDay(day)}>
          <Text>{day.name}</Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcome}>HERD FEST</Text>
          {this.renderDays()}
        </View>
        <View style={styles.nav}>
          <View style={styles.navContainer}>
            <TouchableOpacity onPress={() => this.props.navigator.push({ name: 'Schedule', index: 1, title: 'My Schedule' })} style={[styles.navLink, { backgroundColor: 'purple' }]}>
              <Text style={styles.navText}>My Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigator.push({ name: 'Bands', index: 1, title: 'Bands' })} style={[styles.navLink, { backgroundColor: 'green' }]}>
              <Text style={styles.navText}>Bands</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigator.push({ name: 'Venues', index: 1, title: 'Venues' })} style={[styles.navLink, { backgroundColor: 'blue' }]}>
              <Text style={styles.navText}>Venues</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
