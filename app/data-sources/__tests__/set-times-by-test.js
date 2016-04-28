jest.unmock('../set-times-by');

jest.mock('../../data/serializers', () => { // eslint-disable-line arrow-body-style
  return {
    setTimes: jest.fn((set) => set)
  };
});

jest.mock('../../utils', () => { // eslint-disable-line arrow-body-style
  return {
    dataSource: jest.fn(() => 'dataSource')
  };
});

const testUtils = require('../../test-utils');

const bands = [
  testUtils.fabricate('band', { id: 'b-1', name: 'Band 1' })
];

const venues = [
  testUtils.fabricate('venue', { id: 'v-1', name: 'Venue B' }),
  testUtils.fabricate('venue', { id: 'v-2', name: 'Venue A' })
];

const days = [
  testUtils.fabricate('venue', { id: 'd-1', name: 'Day 1', date: '2015-06-12' }),
  testUtils.fabricate('venue', { id: 'd-2', name: 'Day 2', date: '2015-06-11' })
];

const setTimes = [
  testUtils.fabricate('setTime', {
    id: 'st-1', day: days[0].id, venue: venues[0].id, band: bands[0].id, start_time: '2000-01-01T22:00:00.000Z'
  }),
  testUtils.fabricate('setTime', {
    id: 'st-2', day: days[0].id, venue: venues[0].id, band: bands[0].id, start_time: '2000-01-01T01:00:00.000Z'
  }),
  testUtils.fabricate('setTime', {
    id: 'st-3', day: days[1].id, venue: venues[1].id, band: bands[0].id, start_time: '2000-01-01T23:00:00.000Z'
  }),
  testUtils.fabricate('setTime', {
    id: 'st-4', day: days[1].id, venue: venues[1].id, band: bands[0].id, start_time: '2000-01-01T22:00:00.000Z'
  })
];

const fullSchedule = {
  days,
  bands,
  venues,
  set_times: setTimes
};

describe('setTimesBy', () => {
  describe('venue', () => {
    it('sets up data source for set times by venue', () => {
      const dsSetTimesBy = require('../set-times-by').default;
      const utils = require('../../utils');

      dsSetTimesBy('venue', setTimes, fullSchedule);

      const expectedCollection = [
        {
          id: venues[1].id,
          name: venues[1].name,
          setTimes: [setTimes[2], setTimes[3]]
        },
        {
          id: venues[0].id,
          name: venues[0].name,
          setTimes: [setTimes[0], setTimes[1]]
        }
      ];

      expect(utils.dataSource).toBeCalled();
      expect(utils.dataSource.mock.calls[0][0]).toEqual(expectedCollection);
      expect(utils.dataSource.mock.calls[0][1]).toEqual({
        sectionIds: [0, 1],
        rowIds: [['st-3', 'st-4'], ['st-1', 'st-2']]
      });
      expect(utils.dataSource.mock.calls[0][2].getRowData(expectedCollection, 0, 'st-3')).toEqual(setTimes[2]);
    });
  });

  describe('day', () => {
    it('sets up data source for set times by day', () => {
      const dsSetTimesBy = require('../set-times-by').default;
      const utils = require('../../utils');

      dsSetTimesBy('day', setTimes, fullSchedule);

      const expectedCollection = [
        {
          id: days[1].id,
          name: days[1].name,
          date: days[1].date,
          setTimes: [setTimes[2], setTimes[3]]
        },
        {
          id: days[0].id,
          name: days[0].name,
          date: days[0].date,
          setTimes: [setTimes[0], setTimes[1]]
        }
      ];

      expect(utils.dataSource).toBeCalled();
      expect(utils.dataSource.mock.calls[0][0]).toEqual(expectedCollection);
      expect(utils.dataSource.mock.calls[0][1]).toEqual({
        sectionIds: [0, 1],
        rowIds: [['st-3', 'st-4'], ['st-1', 'st-2']]
      });
      expect(utils.dataSource.mock.calls[0][2].getRowData(expectedCollection, 0, 'st-3')).toEqual(setTimes[2]);
    });
  });
});
