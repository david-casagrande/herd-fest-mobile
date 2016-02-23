jest.dontMock('../../utils');
jest.dontMock('../../data/lookup');
jest.dontMock('../day-list');
jest.autoMockOff();

const dayListDecorator = require('../day-list').default;

const day = {
  id: 'day-1',
  name: 'Day 1',
  venues: ['v-1', 'v-2', 'v-2', 'v-2'],
  bands: ['b-1', 'b-1', 'b-3', 'b-4'],
  set_times: ['st-1', 'st-2', 'st-3', 'st-4']
};

const venues = [
  { id: 'v-1', name: 'Venue B', set_times: ['st-1', 'st-2', 'st-5'] },
  { id: 'v-2', name: 'Venue A', set_times: ['st-3', 'st-4', 'st-5'] }
];

const bands = [
  { id: 'b-1', name: 'Band 1' },
  { id: 'b-2', name: 'Band 2' },
  { id: 'b-3', name: 'Band 3' },
  { id: 'b-4', name: 'Band 4' }
];

const setTimes = [
  { id: 'st-1', start_time: '2000-01-01T20:00:00.000Z', band: 'b-1' },
  { id: 'st-2', start_time: '2000-01-01T01:00:00.000Z', band: 'b-1' },
  { id: 'st-3', start_time: '2000-01-01T00:00:00.000Z', band: 'b-3' },
  { id: 'st-4', start_time: '2000-01-01T23:00:00.000Z', band: 'b-4' }
];

const fullSchedule = {
  days: [day],
  venues: venues,
  bands: bands,
  set_times: setTimes
};

describe('dayListDecorator', function() {
  it('converts day', function() {
    const result = dayListDecorator(day, fullSchedule);
    const expected = {
      // id: day.id,
      // name: day.name,
      venues: [
        {
          id: venues[1].id,
          name: venues[1].name,
          setTimes: [
            {
              id: setTimes[3].id,
              startTime: setTimes[3].start_time,
              band: {
                id: bands[2].id,
                name: bands[2].name
              }
            },
            {
              id: setTimes[2].id,
              startTime: setTimes[2].start_time,
              band: {
                id: bands[3].id,
                name: bands[3].name
              }
            }
          ]
        },
        {
          id: venues[0].id,
          name: venues[0].name,
          setTimes: [
            {
              id: setTimes[0].id,
              startTime: setTimes[3].start_time,
              band: {
                id: bands[0].id,
                name: bands[0].name
              }
            },
            {
              id: setTimes[1].id,
              startTime: setTimes[1].start_time,
              band: {
                id: bands[0].id,
                name: bands[0].name
              }
            }
          ]
        }
      ]
    };

    expect(result.id).toEqual(day.id);
    expect(result.name).toEqual(day.name);
    expect(result.venues.length).toEqual(2);
  });
});
