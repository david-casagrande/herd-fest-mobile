import 'react-native';
import React from 'react';
import MyScheduleContainer from '../MySchedule';
import { findMany, setTimesBy } from '../../utils';
import { shallow } from 'enzyme';
import data from './_full-schedule';

describe('MyScheduleContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      },
      screenProps: data
    };
  });

  it('MyScheduleContainer', () => {
    props.screenProps.mySchedule = [data.set_times[0].id];
    const wrapper = shallow(<MyScheduleContainer {...props} />);
    const view = wrapper.find('MyScheduleView');

    const setTimes = findMany(props.screenProps.set_times, props.screenProps.mySchedule);
    const sections = setTimesBy('day', setTimes, props.screenProps);

    expect(view.prop('sections')).toEqual(sections);

    view.simulate('navigate', 'Band', {});
    expect(props.navigation.navigate).toBeCalledWith('Band', {});
  });
});
