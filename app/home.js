/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
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
      fullSchedule: { bands: [], venues: [], set_times: [] }
    };
    this.setFullSchedule();
  }

  setFullSchedule() {
    fullSchedule().then((json) => {
      this.setState({ fullSchedule: json });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          HERD FEST
        </Text>
        <TouchableHighlight>
          <Text style={styles.instructions} onPress={() => this.props.navigator.push({ name: 'Bands', index: 1, title: 'Bands' })}>
            Bands
          </Text>
        </TouchableHighlight>
        <Text style={styles.instructions} onPress={() => this.props.navigator.push({ name: 'Venues', index: 1, title: 'Venues' })}>
          Venues
        </Text>
        <Text style={styles.instructions} onPress={() => this.props.navigator.push({ name: 'SetTimes', index: 1, title: 'Set Times' })}>
          Set Times
        </Text>
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
