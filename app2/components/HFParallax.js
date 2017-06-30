import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import styles from '../styles/hf-parallax';

const THROTTLE = 1;
const IMAGE_HEIGHT = 300;
const INPUT_RANGE = [-300, 0, 300, 301]; // eslint-disable-line no-magic-numbers
const OUTPUT_RANGE = [600, 300, 0, 0]; // eslint-disable-line no-magic-numbers

// native transform animation
// const style = {
//   width,
//   height: IMAGE_HEIGHT,
//   transform: [
//     {
//       translateY: scrollY.interpolate({
//         inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
//         outputRange: [IMAGE_HEIGHT/2, 0, -IMAGE_HEIGHT/3]
//       })
//     },
//     {
//       scale: scrollY.interpolate({
//         inputRange: [-IMAGE_HEIGHT, 0, IMAGE_HEIGHT],
//         outputRange: [2, 1, 0]
//       })
//     }
//   ]
// };

function header() {
  const props = {
    style: { height: IMAGE_HEIGHT }
  };

  return <View {...props} />;
}

class HFParallax extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0)
    };
  }

  image() {
    const { scrollY } = this.state;

    const style = {
      height: scrollY.interpolate({
        inputRange: INPUT_RANGE,
        outputRange: OUTPUT_RANGE
      })
    };

    const props = {
      source: { uri: this.props.image },
      resizeMode: 'cover',
      style: [styles.image, style]
    };

    return <Animated.Image {...props} />;
  }

  scrollView() {
    // onScroll: Animated.event(
    //   [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
    //   { useNativeDriver: true }
    // )

    const props = {
      scrollEventThrottle: THROTTLE,
      onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }])
    };

    return (
      <Animated.ScrollView {...props}>
        {header()}
        {this.props.children}
      </Animated.ScrollView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.image()}
        {this.scrollView()}
      </View>
    );
  }
}

HFParallax.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default HFParallax;
