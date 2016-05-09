import React from 'react';
import ReactNative from 'react-native';

import navStyles from '../styles/nav-styles';

const Component = React.Component;
const StyleSheet = ReactNative.StyleSheet;
const Text = ReactNative.Text;
const TouchableOpacity = ReactNative.TouchableOpacity;

const styles = StyleSheet.create(navStyles);

export default class LeftButtonNav extends Component {
  onPress() {
    this.props.navigator.pop();
  }

  render() {
    if (this.props.index < 1) {
      return false;
    }

    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <Text style={[styles.navBarText, styles.navBarLeftButton]}>Back</Text>
      </TouchableOpacity>
    );
  }
}

LeftButtonNav.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object,
  index: React.PropTypes.number
};
