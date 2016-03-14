jest.dontMock('lodash');
jest.dontMock('../utils');

const lodash = require('lodash');
const utils = require('../utils').default;
const notEqual = utils.notEqual;
const formatDate = utils.formatDate;
const sortStartTimes = utils.sortStartTimes;
const currentIndex = utils.currentIndex;

describe('utils', () => {
  describe('notEqual', () => {
    it('returns true when items are not equal', () => {
      expect(notEqual(2, 1)).toBeTruthy();
    });

    it('returns true when items are equal', () => {
      expect(notEqual(1, 1)).toBeFalsy();
    });
  });

  describe('formatDate', () => {
    const date = '2000-01-01T04:00:00.000Z';

    it('returns the date in the given format', () => {
      const expected = '04:00 am';
      expect(formatDate(date, 'hh:mm a')).toEqual(expected);
    });

    it('returns the date in the defualt format', () => {
      const expected = '4:00AM';
      expect(formatDate(date)).toEqual(expected);
    });
  });

  describe('sortStartTimes', () => {
    const times = [
      { startTime: '2000-01-01T23:00:00.000Z' },
      { startTime: '2000-01-01T06:00:00.000Z' },
      { startTime: '2000-01-01T22:00:00.000Z' },
      { startTime: '2000-01-01T00:00:00.000Z' },
      { startTime: '2000-01-01T07:00:00.000Z' }
    ];

    it('handles sorting start times with lodash', () => {
      const result = lodash.sortBy(times, sortStartTimes);
      const expected = [
        times[4],
        times[2],
        times[0],
        times[3],
        times[1]
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('currentIndex', () => {
    const routes = [
      { index: 1 },
      { index: 2 },
      { index: 3 }
    ];

    const navigator = {
      getCurrentRoutes() {
        return routes;
      }
    };

    it('returns the current index in the navigator', () => {
      const result = currentIndex(navigator);

      expect(result).toEqual(routes[2].index);
    });
  });
});
