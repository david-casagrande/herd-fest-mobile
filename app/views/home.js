import React from 'react';
import ReactNative from 'react-native';

import homeStyles from '../styles/home-styles';

const Component = React.Component;
const Image = ReactNative.Image;
const StyleSheet = ReactNative.StyleSheet;
const Text = ReactNative.Text;
const TouchableOpacity = ReactNative.TouchableOpacity;
const View = ReactNative.View;
const Animated = ReactNative.Animated;

const styles = StyleSheet.create(homeStyles);

const LinkMap = [
  'Schedule',
  'My Schedule',
  'Bands',
  'Venues'
];

const duration = 1000;

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      opacityAnim: new Animated.Value(0)
    };
  }

  goTo(name) {
    this.props.navigator.push({ name, title: name, index: 1 });
  }

  onLoad() {
    Animated.timing(
      this.state.opacityAnim,
      { toValue: 1, duration }
    ).start();
  }

  link(name, idx) {
    return (
      <TouchableOpacity key={idx} onPress={() => this.goTo(name)} style={[styles.link]}>
        <Text style={styles.linkText}>{name.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  links() {
    return LinkMap.map((name, idx) => this.link(name, idx));
  }

  image() {
    return (
      <Image style={styles.logo} resizeMode={'contain'} source={require('../images/home.png')} onLoad={() => this.onLoad()}/>
    );
  }

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacityAnim }]}>
        <View style={styles.content}>
          {this.image()}
          <View style={styles.days}>
            {this.links()}
          </View>
        </View>
      </Animated.View>
    );
  }
}

Home.duration = duration;
Home.propTypes = {
  navigator: React.PropTypes.object
};
