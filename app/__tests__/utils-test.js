jest.dontMock('../utils');

const utils = require('../utils').default;
const notEqual = utils.notEqual;
const uniq = utils.uniq;
const groupBy = utils.groupBy;
const formatDate = utils.formatDate;
const sortStartTimes = utils.sortStartTimes;
const sortByName = utils.sortByName;
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

  describe('uniq', () => {
    it('returns array of unique values', () => {
      const collection = [1, 1, 2, 3, 4, 4]; // eslint-disable-line no-magic-numbers
      const expected = [1, 2, 3, 4];  // eslint-disable-line no-magic-numbers

      expect(uniq(collection)).toEqual(expected);
    });
  });

  describe('groupBy', () => {
    it('returns object collection grouped as key', () => {
      const collection = [
        { id: 1, group: 'g-1' },
        { id: 2, group: 'g-2' },
        { id: 3, group: 'g-2' },
        { id: 4, group: 'g-3' },
        { id: 5, group: 'g-1' }
      ];

      const expected = {
        'g-1': [collection[0], collection[4]],
        'g-2': [collection[1], collection[2]],
        'g-3': [collection[3]]
      };

      expect(groupBy(collection, 'group')).toEqual(expected);
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

    it('handles sorting start times', () => {
      const result = Array.from(times).sort(sortStartTimes);
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

  describe('sortByName', () => {
    const names = [
      { name: 'Elliott' },
      { name: 'Harper' },
      { name: 'David' }
    ];

    it('sorts items by name', () => {
      const result = Array.from(names).sort(sortByName);
      const expected = [
        names[2],
        names[0],
        names[1]
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('currentIndex', () => {
    const navigator = {
      getCurrentRoutes() {
        return [
          { index: 1 },
          { index: 2 },
          { index: 3 }
        ];
      }
    };

    it('returns the current index in the navigator', () => {
      const result = currentIndex(navigator);

      expect(result).toEqual(3);
    });
  });
});
