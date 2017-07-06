import 'react-native';
import React from 'react';
import VenueContainer from '../Venue';
import { findMany, setTimesBy } from '../../utils';
import data from './_full-schedule';

import { shallow } from 'enzyme';

describe('VenuesContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        state: {
          params: data.venues[0]
        }
      },
      screenProps: data
    };
  });

  it('VenueView', () => {
    const wrapper = shallow(<VenueContainer {...props} />);
    const view = wrapper.find('VenueView');

    const venue = props.screenProps.venues[0];
    const setTimes = findMany(props.screenProps.set_times, venue.set_times);
    const sections = setTimesBy('day', setTimes, props.screenProps);

    expect(view.prop('venue')).toEqual(venue);
    expect(view.prop('sections')).toEqual(sections);

    view.simulate('navigate', 'Band', {});

    expect(props.navigation.navigate).toBeCalledWith('Band', {});
  });
});
