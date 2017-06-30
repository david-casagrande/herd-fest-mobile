import 'react-native';
import React from 'react';
import MyScheduleContainer from '../MySchedule';

import { shallow } from 'enzyme';

describe('MyScheduleContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      // navigation: {
      //   navigate: jest.fn(),
      //   state: {
      //     params: { id: '1', set_times: [] }
      //   }
      // },
      screenProps: {
        venues: [{ id: '1', set_times: [] }],
        bands: [],
        days: [],
        set_times: []
      }
    };
  });

  it('VenueView', () => {
    const wrapper = shallow(<MyScheduleContainer {...props} />);
    const view = wrapper.find('VenueView');

    expect(view.prop('venue')).toEqual(props.screenProps.venues[0]);

    view.simulate('navigate', 'Band', {});

    expect(props.navigation.navigate).toBeCalledWith('Band', {});
  });
});
