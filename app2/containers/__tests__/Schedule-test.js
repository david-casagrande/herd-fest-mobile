import 'react-native';
import React from 'react';
import ScheduleContainer from '../Schedule';
import colors from '../../styles/_colors';

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
      screenProps: {
        bands: [
          { id: '1', name: 'Band 1' }
        ],
        venues: [
          { id: '1', name: 'Venue 1', street_address: 'address' }
        ],
        set_times: [
          { id: '1', day: '1', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' },
          { id: '2', day: '2', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' },
          { id: '3', day: '3', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' },
          { id: '4', day: '4', band: '1', venue: '1', start_time: '2000-01-01T22:45:00.000Z' }
        ],
        days: [
          { id: '1', name: 'Thursday', set_times: ['1'] },
          { id: '2', name: 'Friday', set_times: ['2'] },
          { id: '3', name: 'Saturday', set_times: ['3'] },
          { id: '4', name: 'Sunday', set_times: ['4'] }
        ]
      }
    };
  });

  describe('Thursday', () => {
    it('ScheduleView', () => {
      const wrapper = shallow(<ScheduleContainer {...props} />);
      const view = wrapper.find('ScheduleView');

      const setTimes = [
        {
          id: '1',
          start_time: '2000-01-01T22:45:00.000Z',
          band: { id: '1', name: 'Band 1' },
          day: { id: '1', name: 'Thursday', set_times: ['1'] },
          venue: { id: '1', name: 'Venue 1', street_address: 'address' }
        }
      ];

      const sections = [
        {
          id: '1',
          name: 'Venue 1',
          street_address: 'address',
          set_times: setTimes,
          data: setTimes
        }
      ];

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

      const setTimes = [
        {
          id: '2',
          start_time: '2000-01-01T22:45:00.000Z',
          band: { id: '1', name: 'Band 1' },
          day: { id: '2', name: 'Friday', set_times: ['2'] },
          venue: { id: '1', name: 'Venue 1', street_address: 'address' }
        }
      ];

      const sections = [
        {
          id: '1',
          name: 'Venue 1',
          street_address: 'address',
          set_times: setTimes,
          data: setTimes
        }
      ];

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

      const setTimes = [
        {
          id: '3',
          start_time: '2000-01-01T22:45:00.000Z',
          band: { id: '1', name: 'Band 1' },
          day: { id: '3', name: 'Saturday', set_times: ['3'] },
          venue: { id: '1', name: 'Venue 1', street_address: 'address' }
        }
      ];

      const sections = [
        {
          id: '1',
          name: 'Venue 1',
          street_address: 'address',
          set_times: setTimes,
          data: setTimes
        }
      ];

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

      const setTimes = [
        {
          id: '4',
          start_time: '2000-01-01T22:45:00.000Z',
          band: { id: '1', name: 'Band 1' },
          day: { id: '4', name: 'Sunday', set_times: ['4'] },
          venue: { id: '1', name: 'Venue 1', street_address: 'address' }
        }
      ];

      const sections = [
        {
          id: '1',
          name: 'Venue 1',
          street_address: 'address',
          set_times: setTimes,
          data: setTimes
        }
      ];

      expect(view.prop('sections')).toEqual(sections);
      expect(view.prop('color')).toEqual(colors.pinWheel[3]);

      view.simulate('navigate', 'Venue', {});
      expect(props.navigation.navigate).toBeCalledWith('Venue', {});
    });
  });
});
