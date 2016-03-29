import React from 'react-native';
// import Toolbar from './components/toolbar';
// import Twitter from './components/twitter';

import homeStyles from '../styles/home-styles';
import lodash from 'lodash';

const Component = React.Component;
const Dimensions = React.Dimensions;
const Image = React.Image;
const StyleSheet = React.StyleSheet;
const Text = React.Text;
const TouchableOpacity = React.TouchableOpacity;
const View = React.View;

const styles = StyleSheet.create(homeStyles);

export default class Home extends Component {
  goToDay(day) {
    this.props.navigator.push({ name: 'Day', index: 1, title: day.name, id: day.id });
  }

  renderDays() {
    const days = lodash.sortBy(this.props.fullSchedule.days, ['date']);

    return days.map((day) => { // eslint-disable-line arrow-body-style
      return (
        <TouchableOpacity key={day.id} onPress={() => this.goToDay(day)} style={[styles.link]}>
          <Text style={styles.linkText}>{day.name.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    });
  }

  toolbarOnPress(name, navigator) {
    const map = {
      'Schedule': { name, index: 1, title: 'My Schedule' },
      'Bands': { name, index: 1, title: 'Bands' },
      'Venues': { name, index: 1, title: 'Venues' }
    };

    navigator.push(map[name]);
  }

  render() {
    // <Toolbar onPress={(name) => this.toolbarOnPress(name, this.props.navigator)} />
    // console.log(Dimensions.get('window').width)
    const offset = 100;
    const width = Dimensions.get('window').width - offset;
    return (
      <View style={[styles.container, { paddingTop: 30 }]}>
        <View style={styles.content}>
          <Image style={[styles.logo, { width, height: width }]} resizeMode={'contain'} source={require('../images/home.png')} />
          <View style={[styles.days, { width }]}>{this.renderDays()}</View>
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  fullSchedule: React.PropTypes.object,
  navigator: React.PropTypes.instanceOf(React.Navigator)
};
