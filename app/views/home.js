import React from 'react-native';
import Toolbar from './components/toolbar';

import homeStyles from '../styles/home-styles';
import lodash from 'lodash';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars
const View = React.View; // eslint-disable-line no-unused-vars

const styles = StyleSheet.create(homeStyles);

export default class Home extends Component {
  goToDay(day) {
    this.props.navigator.push({ name: 'Day', index: 1, title: day.name, id: day.id });
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

  toolbarOnPress(name, navigator) {
    const map = {
      'Schedule': { name, index: 1, title: 'My Schedule' },
      'Bands': { name, index: 1, title: 'Bands' },
      'Venues': { name, index: 1, title: 'Venues' }
    };

    navigator.push(map[name]);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.welcome}>HERD FEST</Text>
          {this.renderDays()}
        </View>
        <Toolbar onPress={(name) => this.toolbarOnPress(name, this.props.navigator)} />
      </View>
    );
  }
}
