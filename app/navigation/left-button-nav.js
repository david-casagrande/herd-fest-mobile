import React from 'react-native';

import navStyles from '../styles/nav-styles';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;

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
      <TouchableOpacity onPress={() => this.onPress()} style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  }
}

LeftButtonNav.propTypes = {
  route: React.PropTypes.object,
  navigator: React.PropTypes.object,
  index: React.PropTypes.number
};
