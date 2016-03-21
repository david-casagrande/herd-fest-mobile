// copped from https://github.com/hosainnet/RNUnitTests

const React = require('react-native/node_modules/react');
const ReactNative = React;

ReactNative.StyleSheet = {
  create: function create(styles) {
    return styles;
  }
};

class View extends React.Component {
  render() {
    return false;
  }
}

function ds(opts, dsOpts) {
  return { dataSourceArgs: opts, dsArgs: dsOpts };
}

class ListView extends React.Component {
  static DataSource(opts) {
    return {
      cloneWithRows: jest.fn((cloneOpts) => ds(opts, cloneOpts)),
      cloneWithRowsAndSections: jest.fn((cloneOpts) => ds(opts, cloneOpts))
    };
  }
}

class AppRegistry {
  static registerComponent() {
    return false;
  }
}

const AsyncStorage = {
  getItem: jest.fn(() => new Promise((resolve) => resolve(null))),
  setItem: jest.fn((key, value) => new Promise((resolve) => resolve({ key, value })))
};

ReactNative.View = View;
ReactNative.ScrollView = View;
ReactNative.ListView = ListView;
ReactNative.Text = View;
ReactNative.TouchableOpacity = View;
ReactNative.TouchableHighlight = View;
ReactNative.TouchableWithoutFeedback = View;
ReactNative.ToolbarAndroid = View;
ReactNative.Image = View;
ReactNative.AppRegistry = AppRegistry;
ReactNative.AsyncStorage = AsyncStorage;

module.exports = ReactNative;
