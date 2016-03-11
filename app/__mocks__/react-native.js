// copped from https://github.com/hosainnet/RNUnitTests

const React = require('react-native/node_modules/react');
const ReactNative = React;

ReactNative.StyleSheet = {
  create: function create(styles) {
      return styles;
  }
};

class View extends React.Component {
  render() { return false; }
}

class ListView extends React.Component {
  static DataSource() {
  }
}

class AppRegistry {
  static registerComponent () {
  }
}

const AsyncStorage = {
  getItem() {
    return new Promise((resolve) => resolve(null));
  },

  setItem(key, value) {
    return new Promise((resolve) => resolve({ key, value }));
  }
}

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
