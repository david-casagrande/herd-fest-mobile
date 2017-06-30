import 'react-native';
import React from 'react';
import MyScheduleContainer from '../MySchedule';
import { findMany, setTimesBy } from '../../utils';
import { get } from '../../data/my-schedule'
import data from './_full-schedule';

import { shallow, mount } from 'enzyme';

jest.mock('../../data/my-schedule');

describe('MyScheduleContainer', () => {
  let props = null;

  beforeEach(() => {
    // const jsdom = require('jsdom').jsdom;
    // global.document = jsdom('');
    // global.window = document.defaultView;
    // Object.keys(document.defaultView).forEach((property) => {
    //   if (typeof global[property] === 'undefined') {
    //     global[property] = document.defaultView[property];
    //   }
    // });

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

  it('sets up data on mount', () => {
    get.mockImplementation(() => new Promise((resolve) => resolve([])));

    const wrapper = mount(<MyScheduleContainer {...props} />);
    const view = wrapper.find('MyScheduleView');

    // console.log(wrapper.instance())
    // wrapper.instance().componentDidMount();
    //
    // expect(get).toBeCalled();
  });
});
