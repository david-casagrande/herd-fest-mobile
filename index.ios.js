/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React from 'react';
import ReactNative from 'react-native';

import Nav from './app/nav';
import App from './app2/App';

const AppRegistry = ReactNative.AppRegistry;
const Component = React.Component;

class HerdFest extends Component {
  render() {
    return <App />;
  }
}

AppRegistry.registerComponent('HerdFest', () => HerdFest);
