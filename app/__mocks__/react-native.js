// const ReactNative = require('react-native-mock/mock');
// copped from https://github.com/hosainnet/RNUnitTests

const React = require('react');
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

const Animated = {
  View: View,
  Value: jest.fn((val) => val),
  timing: jest.fn(() => {
    return {
      start: jest.fn((fn) => fn())
    };
  })
};

const AsyncStorage = {
  getItem: jest.fn(() => new Promise((resolve) => resolve(null))),
  setItem: jest.fn((key, value) => new Promise((resolve) => resolve({ key, value })))
};

class Dimensions {
  static get() {
    return {
      width: 300,
      height: 200
    };
  }
}

ReactNative.View = View;
ReactNative.ScrollView = class ScrollView extends View {};
ReactNative.ListView = ListView;
ReactNative.Text = class Text extends View {};
ReactNative.TouchableOpacity = class TouchableOpacity extends View {};
ReactNative.TouchableHighlight = class TouchableHighlight extends View {};
ReactNative.TouchableWithoutFeedback = class TouchableWithoutFeedback extends View {};
ReactNative.ToolbarAndroid = class ToolbarAndroid extends View {};
ReactNative.Image = class Image extends View {};
ReactNative.AppRegistry = AppRegistry;
ReactNative.AsyncStorage = AsyncStorage;
ReactNative.Dimensions = Dimensions;
ReactNative.Animated = Animated;

module.exports = ReactNative;
