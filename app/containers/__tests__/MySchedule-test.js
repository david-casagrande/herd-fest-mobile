import 'react-native';
import React from 'react';
import MyScheduleContainer from '../MySchedule';
import { findMany, setTimesBy } from '../../utils';
import { get } from '../../data/my-schedule'

import { shallow, mount } from 'enzyme';

jest.mock('../../data/my-schedule');

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
    const wrapper = shallow(<MyScheduleContainer {...props} />);
    const view = wrapper.find('MyScheduleView');

    expect(view.prop('sections')).toEqual([]);
  });
});
