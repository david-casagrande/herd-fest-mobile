import 'react-native';
import React from 'react';
import ScheduleContainer from '../Schedule';
import { findMany, setTimesBy } from '../../utils';
import colors from '../../styles/_colors';
import data from '../../../test-data/full-schedule';

import { shallow } from 'enzyme';

describe('ScheduleContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        state: {
          key: 'Thursday'
        }
      },
      screenProps: data
    };
  });

  describe('Thursday', () => {
    it('ScheduleView', () => {
      const wrapper = shallow(<ScheduleContainer {...props} />);
      const view = wrapper.find('ScheduleView');

      const [day] = props.screenProps.days;
      const setTimes = findMany(props.screenProps.set_times, day.set_times);
      const sections = setTimesBy('venue', setTimes, props.screenProps);

      expect(view.prop('sections')).toEqual(sections);
      expect(view.prop('color')).toEqual(colors.pinWheel[0]);

      view.simulate('navigate', 'Venue', {});
      expect(props.navigation.navigate).toBeCalledWith('Venue', {});
    });
  });

  describe('Friday', () => {
    it('ScheduleView', () => {
      props.navigation.state.key = 'Friday';
      const wrapper = shallow(<ScheduleContainer {...props} />);
      const view = wrapper.find('ScheduleView');

      const day = props.screenProps.days[1]; // eslint-disable-line prefer-destructuring
      const setTimes = findMany(props.screenProps.set_times, day.set_times);
      const sections = setTimesBy('venue', setTimes, props.screenProps);

      expect(view.prop('sections')).toEqual(sections);
      expect(view.prop('color')).toEqual(colors.pinWheel[1]);

      view.simulate('navigate', 'Venue', {});
      expect(props.navigation.navigate).toBeCalledWith('Venue', {});
    });
  });

  describe('Saturday', () => {
    it('ScheduleView', () => {
      props.navigation.state.key = 'Saturday';
      const wrapper = shallow(<ScheduleContainer {...props} />);
      const view = wrapper.find('ScheduleView');

      const day = props.screenProps.days[2]; // eslint-disable-line prefer-destructuring
      const setTimes = findMany(props.screenProps.set_times, day.set_times);
      const sections = setTimesBy('venue', setTimes, props.screenProps);

      expect(view.prop('sections')).toEqual(sections);
      expect(view.prop('color')).toEqual(colors.pinWheel[2]);

      view.simulate('navigate', 'Venue', {});
      expect(props.navigation.navigate).toBeCalledWith('Venue', {});
    });
  });

  describe('Sunday', () => {
    it('ScheduleView', () => {
      props.navigation.state.key = 'Sunday';
      const wrapper = shallow(<ScheduleContainer {...props} />);
      const view = wrapper.find('ScheduleView');

      const day = props.screenProps.days[3]; // eslint-disable-line prefer-destructuring
      const setTimes = findMany(props.screenProps.set_times, day.set_times);
      const sections = setTimesBy('venue', setTimes, props.screenProps);

      expect(view.prop('sections')).toEqual(sections);
      expect(view.prop('color')).toEqual(colors.pinWheel[3]);

      view.simulate('navigate', 'Venue', {});
      expect(props.navigation.navigate).toBeCalledWith('Venue', {});
    });
  });
});
