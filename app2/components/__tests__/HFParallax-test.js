import React from 'react';
import ReactNative from 'react-native';
import { shallow } from 'enzyme';
import HFParallax from '../HFParallax';

describe('HFParallax', () => {
  let props = null;
  let AnimatedValueInstance = null;

  beforeEach(() => {
    AnimatedValueInstance = { interpolate: jest.fn() };

    ReactNative.Animated.Value = jest.fn(() => AnimatedValueInstance);
    ReactNative.Animated.event = jest.fn();
    ReactNative.Animated.ScrollView = () => false;
    ReactNative.Animated.Image = () => false;

    props = {
      image: 'image'
    };
  });

  describe('image', () => {
    it('sets props', () => {
      const wrapper = shallow(<HFParallax {...props} />);
      const img = wrapper.find(ReactNative.Animated.Image);

      expect(img.prop('source')).toEqual({ uri: 'image' });
      expect(AnimatedValueInstance.interpolate).toBeCalledWith({
        inputRange: [-300, 0, 300, 301], // eslint-disable-line no-magic-numbers
        outputRange: [600, 300, 0, 0] // eslint-disable-line no-magic-numbers
      });
    });
  });

  describe('scrollView', () => {
    it('sets props', () => {
      const wrapper = shallow(<HFParallax {...props} />);
      const scrollView = wrapper.find(ReactNative.Animated.ScrollView);

      expect(scrollView.prop('scrollEventThrottle')).toEqual(1);

      scrollView.simulate('scroll');

      expect(ReactNative.Animated.event).toBeCalledWith([{ nativeEvent: { contentOffset: { y: AnimatedValueInstance } } }]);
    });
  });
});
