import React, {
  Component,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import { fullSchedule } from './server';
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
    fullSchedule().then((json) => {
      this.setState({ fullSchedule: json });
    });
  }

  render() {
    const days = this.state.fullSchedule.days.sort((l, r) => l.name > r.name).map((day) => {
      return <Text key={day.id} onPress={() => this.props.navigator.push({ name: 'Day', index: 1, title: day.name, day_id: day.id })}>{day.name}</Text>;
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>HERD FEST</Text>
        {days}
      </View>
    );
  }
}
