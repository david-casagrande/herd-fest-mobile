import ReactNative from 'react-native';
import moment from 'moment';
import { sortBy } from 'lodash';
import { formatDate, sortStartTimes, sortSetTimesByDays, findMany, link, isAndroid, setTimesBy } from '../utils';
import colors from '../styles/_colors';

jest.mock('ReactNative');

describe('utils', () => {
  beforeEach(() => {
    ReactNative.Linking.canOpenURL.mockReset();
    ReactNative.Linking.openURL.mockReset();
  });

  describe('formatDate', () => {
    const date = '2000-01-01T04:00:00.000Z';

    it('formats a date', () => {
      const expected = moment.utc(date).format('h:mmA')
      expect(formatDate(date)).toEqual(expected);
    });

    it('accepts a format', () => {
      const format = 'hA'
      const expected = moment.utc(date).format(format)
      expect(formatDate(date, format)).toEqual(expected);
    });
  });

  describe('sortStartTimes', () => {
    const times = [
      { start_time: '2000-01-01T23:00:00.000Z' },
      { start_time: '2000-01-01T06:00:00.000Z' },
      { start_time: '2000-01-01T22:00:00.000Z' },
      { start_time: '2000-01-01T00:00:00.000Z' },
      { start_time: '2000-01-01T07:00:00.000Z' },
      { start_time: '2000-01-01T06:30:00.000Z' },
      { start_time: '2000-01-01T06:15:00.000Z' }
    ];

    it('handles sorting start times', () => {
      const result = sortBy(times, sortStartTimes);

      const expected = [
        times[4],
        times[2],
        times[0],
        times[3],
        times[1],
        times[6],
        times[5]
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('sortSetTimesByDays', () => {
    const setTimes = [
      { day: { date: '2000-01-02T23:00:00.000Z' } },
      { day: { date: '2000-01-01T06:00:00.000Z' } },
      { day: { date: '2000-01-03T22:00:00.000Z' } },
      { day: { date: '2000-01-05T00:00:00.000Z' } },
      { day: { date: '2000-01-04T07:00:00.000Z' } }
    ];

    it('handles sorting start times with lodash', () => {
      const result = sortBy(setTimes, sortSetTimesByDays);
      const expected = [
        setTimes[1],
        setTimes[0],
        setTimes[2],
        setTimes[4],
        setTimes[3]
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('findMany', () => {
    const collection = [
      { id: '1', name: 'A' },
      { id: '2', name: 'B' },
      { id: '3', name: 'C' }
    ];

    it('returns an array of objects with ids matching given ids argument', () => {
      const ids = ['1', '3'];
      const results = findMany(collection, ids);

      expect(results.length).toEqual(2);
      expect(results[0]).toEqual(collection[0]);
      expect(results[1]).toEqual(collection[2]);
    });
  });

  describe('link', () => {
    it('calls openURL if canOpenURL returns true', () => {
      ReactNative.Linking.canOpenURL.mockImplementation(() => new Promise((resolve) => resolve(true)));
      ReactNative.Linking.openURL.mockImplementation(() => new Promise((resolve) => resolve()));

      return link('url').then((value) => {
        expect(ReactNative.Linking.canOpenURL).toBeCalledWith('url');
        expect(ReactNative.Linking.openURL).toBeCalledWith('url');
      });
    });

    it('does not call openURL if canOpenURL returns false', () => {
      ReactNative.Linking.canOpenURL.mockImplementation(() => new Promise((resolve) => resolve(false)));
      ReactNative.Linking.openURL.mockImplementation(() => new Promise((resolve) => resolve()));

      return link('url').catch((value) => {
        expect(ReactNative.Linking.canOpenURL).toBeCalledWith('url');
        expect(ReactNative.Linking.openURL).not.toBeCalled();
      });
    });
  });

  describe('isAndroid', () => {
    it('returns true if platform is android', () => {
      ReactNative.Platform.OS = 'android';
      expect(isAndroid()).toEqual(true);
    });

    it('returns false if platform is android', () => {
      ReactNative.Platform.OS = 'ios';
      expect(isAndroid()).toEqual(false);
    });
  });

  describe('setTimesBy', () => {
    const bands = [
      { id: 'b-1', name: 'Band 1' }
    ];

    const venues = [
      { id: 'v-1', name: 'Venue B', street_address: '111 St' },
      { id: 'v-2', name: 'Venue A', street_address: '555 St' }
    ];

    const days = [
      { id: 'd-1', name: 'Day 1', date: '2015-06-12' },
      { id: 'd-2', name: 'Day 2', date: '2015-06-11' }
    ];

    const setTimes = [
      { id: 'st-1', day: 'd-1', venue: 'v-1', band: 'b-1', start_time: '2000-01-01T22:00:00.000Z' },
      { id: 'st-2', day: 'd-1', venue: 'v-1', band: 'b-1', start_time: '2000-01-01T01:00:00.000Z' },
      { id: 'st-3', day: 'd-2', venue: 'v-2', band: 'b-1', start_time: '2000-01-01T23:00:00.000Z' },
      { id: 'st-4', day: 'd-2', venue: 'v-2', band: 'b-1', start_time: '2000-01-01T22:00:00.000Z' }
    ];

    const store = { bands, venues, days, set_times: setTimes };

    it('serializes data and groups by venue', () => {
      const setTimes1 = [
        {
          id: 'st-4',
          start_time: '2000-01-01T22:00:00.000Z',
          band: bands[0],
          day: days[1],
          venue: venues[1]
        },
        {
          id: 'st-3',
          start_time: '2000-01-01T23:00:00.000Z',
          band: bands[0],
          day: days[1],
          venue: venues[1]
        }
      ];

      const setTimes2 = [
        {
          id: 'st-1',
          start_time: '2000-01-01T22:00:00.000Z',
          band: bands[0],
          day: days[0],
          venue: venues[0]
        },
        {
          id: 'st-2',
          start_time: '2000-01-01T01:00:00.000Z',
          band: bands[0],
          day: days[0],
          venue: venues[0]
        }
      ];

      const expected = [
        {
          id: 'v-2',
          name: 'Venue A',
          street_address: '555 St',
          color: colors.pinWheel[0],
          set_times: setTimes1,
          data: setTimes1
        },
        {
          id: 'v-1',
          name: 'Venue B',
          street_address: '111 St',
          color: colors.pinWheel[1],
          set_times: setTimes2,
          data: setTimes2
        }
      ];

      expect(setTimesBy('venue', setTimes, store)).toEqual(expected);
    });

    it('serializes data and groups by days', () => {
      const setTimes1 = [
        {
          id: 'st-4',
          start_time: '2000-01-01T22:00:00.000Z',
          band: bands[0],
          day: days[1],
          venue: venues[1]
        },
        {
          id: 'st-3',
          start_time: '2000-01-01T23:00:00.000Z',
          band: bands[0],
          day: days[1],
          venue: venues[1]
        }
      ];

      const setTimes2 = [
        {
          id: 'st-1',
          start_time: '2000-01-01T22:00:00.000Z',
          band: bands[0],
          day: days[0],
          venue: venues[0]
        },
        {
          id: 'st-2',
          start_time: '2000-01-01T01:00:00.000Z',
          band: bands[0],
          day: days[0],
          venue: venues[0]
        }
      ];

      const expected = [
        {
          id: 'd-2',
          name: 'Day 2',
          date: '2015-06-11',
          color: colors.pinWheel[0],
          set_times: setTimes1,
          data: setTimes1
        },
        {
          id: 'd-1',
          name: 'Day 1',
          date: '2015-06-12',
          color: colors.pinWheel[1],
          set_times: setTimes2,
          data: setTimes2
        }
      ];

      expect(setTimesBy('day', setTimes, store)).toEqual(expected);
    });
  });
});
