jest.dontMock('lodash');
jest.dontMock('../utils');

const lodash = require('lodash');
const utils = require('../utils').default;
const notEqual = utils.notEqual;
const formatDate = utils.formatDate;
const sortStartTimes = utils.sortStartTimes;
const currentIndex = utils.currentIndex;
const findMany = utils.findMany;

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
    describe('canOpenUrl returns true', () => {
      pit('returns Linking.openURL promise', () => {
        jest.setMock('react-native', {
          Linking: {
            canOpenURL: jest.fn(() => new Promise((resolve) => resolve(true))),
            openURL: jest.fn((url) => new Promise((resolve) => resolve(url)))
          }
        });

        const react = require('react-native');
        const _utils = require('../utils').default; // eslint-disable-line no-underscore-dangle

        return _utils.link('url').then((value) => {
          expect(react.Linking.canOpenURL).toBeCalledWith('url');
          expect(value).toEqual('url');
        });
      });
    });

    describe('canOpenUrl returns false', () => {
      pit('returns promise with false', () => {
        jest.setMock('react-native', {
          Linking: {
            canOpenURL: jest.fn(() => new Promise((resolve) => resolve(false)))
          }
        });

        const react = require('react-native');
        const _utils = require('../utils').default; // eslint-disable-line no-underscore-dangle

        return _utils.link('url').catch((value) => {
          expect(react.Linking.canOpenURL).toBeCalledWith('url');
          expect(value).toEqual(false);
        });
      });
    });
  });

  describe('dataSource', () => {
    let ds = null;
    let _utils = null;

    beforeEach(() => {
      ds = {
        cloneWithRows: jest.fn(),
        cloneWithRowsAndSections: jest.fn()
      };

      jest.setMock('react-native', {
        ListView: {
          DataSource: jest.fn(() => ds)
        }
      });

      _utils = require('../utils').default;
    });

    it('creates an instance of ListView.DataSource and clones with rows', () => {
      const react = require('react-native');
      const collection = [1];

      _utils.dataSource(collection);

      expect(react.ListView.DataSource).toBeCalledWith({
        rowHasChanged: _utils.notEqual,
        sectionHeaderHasChanged: _utils.notEqual
      });

      expect(ds.cloneWithRows).toBeCalledWith(collection);
    });

    it('creates an instance of ListView.DataSource and clones with rows and sections', () => {
      const react = require('react-native');
      const collection = [1];
      const ids = {
        sectionIds: [1],
        rowIds: [1]
      };

      const opts = {
        getRowData: jest.fn()
      }

      _utils.dataSource(collection, ids, opts);

      expect(react.ListView.DataSource).toBeCalledWith({
        rowHasChanged: _utils.notEqual,
        sectionHeaderHasChanged: _utils.notEqual,
        getRowData: opts.getRowData
      });

      expect(ds.cloneWithRowsAndSections).toBeCalledWith(collection, ids.sectionIds, ids.rowIds);
    });
  });
});
