'use strict';

import React, {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import { fullSchedule } from './server';

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
      return <Text key={day.id} onPress={() => this.props.navigator.push({ name: day.name, index: 1, title: day.name })}>{day.name}</Text>;
    });

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>HERD FEST</Text>
        {days}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
