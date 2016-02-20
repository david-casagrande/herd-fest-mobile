'use strict';

import React, {
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import Home from './home';
import List from './list';
import DayList from './day-list';
import Band from './band';
import { fullSchedule } from './server';
import { getOne } from './data/lookup';

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight>
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index < 1) { return null; }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
    if(index < 1) { return null; }
    return (
      <TouchableOpacity
        onPress={() => navigator.push()}
        style={styles.navBarRightButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Next
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    if(index < 1) { return null; }
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },

};

function newRandomRoute() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
}

var NavigationBarSample = React.createClass({

  setFullSchedule: function() {
    fullSchedule().then((json) => {
      this.setState({ fullSchedule: json });
    });
  },

  getInitialState: function() {
    return { fullSchedule: { bands: [], venues: [], set_times:[], days: [] } };
  },

  componentWillMount: function() {
    var navigator = this.props.navigator;

    var callback = (event) => {
      console.log(
        `NavigationBarSample : event ${event.type}`,
        {
          route: JSON.stringify(event.data.route),
          target: event.target,
          type: event.type,
        }
      );
    };

    // Observe focus change events from this component.
    this._listeners = [
      // navigator.navigationContext.addListener('willfocus', callback),
      // navigator.navigationContext.addListener('didfocus', callback),
    ];

    this.setFullSchedule();
  },

  componentWillUnmount: function() {
    this._listeners && this._listeners.forEach(listener => listener.remove());
  },

  findDay: function(query) {
    return this.state.fullSchedule.days.find((day) => day.name === query);
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{ name: 'Home', index: 0 }}
        renderScene={(route, navigator) => {
          const component = {
            'Home': <Home navigator={navigator} />,
            'Bands': <List navigator={navigator} dataSource={this.state.fullSchedule.bands} />,
            'Days': <List navigator={navigator} dataSource={this.state.fullSchedule.days} />,
            'Venues': <List navigator={navigator} dataSource={this.state.fullSchedule.venues} />,
            'SetTimes': <List navigator={navigator} dataSource={this.state.fullSchedule.set_times} />,
            'Day': <DayList navigator={navigator} dataSource={getOne(this.state.fullSchedule.days, route.day_id)} fullSchedule={this.state.fullSchedule} />,
            'Band': <Band navigator={navigator} band={getOne(this.state.fullSchedule.bands, route.band_id)} fullSchedule={this.state.fullSchedule}/>
          }

          return component[route.name];
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  },

});

var styles = StyleSheet.create({
  messageText: {
    fontSize: 17,
    fontWeight: '500',
    padding: 15,
    marginTop: 50,
    marginLeft: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#CDCDCD',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
  navBar: {
    backgroundColor: 'white',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    // color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    // color: cssVar('fbui-accent-blue'),
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

export default NavigationBarSample;
