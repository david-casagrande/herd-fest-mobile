/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react';
import ReactNative from 'react-native';

import Nav from './app/nav';

const AppRegistry = ReactNative.AppRegistry;
const Component = React.Component;

class HerdFest extends Component {
  render() {
    return <Nav />;
  }
}

AppRegistry.registerComponent('HerdFest', () => HerdFest);
