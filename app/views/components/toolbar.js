import React from 'react-native';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const View = React.View; // eslint-disable-line no-unused-vars
const Text = React.Text; // eslint-disable-line no-unused-vars
const TouchableOpacity = React.TouchableOpacity; // eslint-disable-line no-unused-vars

import toolbarStyles from '../../styles/components/toolbar';

const styles = StyleSheet.create(toolbarStyles);

export default class Toolbar extends Component {
  onPress(name) {
    this.props.onPress(name);
  }

  render() {
    return (
      <View style={styles.nav}>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => this.onPress('Schedule')} style={[styles.navLink, { backgroundColor: 'purple' }]}>
            <Text style={styles.navText}>My Schedule</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress('Bands')} style={[styles.navLink, { backgroundColor: 'green' }]}>
            <Text style={styles.navText}>Bands</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.onPress('Venues')} style={[styles.navLink, { backgroundColor: 'blue' }]}>
            <Text style={styles.navText}>Venues</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
