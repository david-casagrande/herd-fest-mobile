import React from 'react-native';

const Component = React.Component;
const StyleSheet = React.StyleSheet;
const View = React.View;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;

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

Toolbar.propTypes = {
  onPress: React.PropTypes.func
};
