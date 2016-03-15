/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component
} from 'react-native';

import Nav from './app/nav';

class HerdFest extends Component {
  render() {
    return <Nav />;
  }
}

AppRegistry.registerComponent('HerdFest', () => HerdFest);
