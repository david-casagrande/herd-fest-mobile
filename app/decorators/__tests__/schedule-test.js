jest.unmock('../../utils');
jest.unmock('../../data/serializers');
jest.unmock('../schedule');

const scheduleDecorator = require('../schedule').default;

const setTimes = [
  { id: 'st-1', start_time: '2000-01-01T20:00:00.000Z', band: 'b-1', day: 'day-2', venue: 'v-1' },
  { id: 'st-2', start_time: '2000-01-01T01:00:00.000Z', band: 'b-2', day: 'day-1', venue: 'v-2' },
  { id: 'st-3', start_time: '2000-01-01T19:00:00.000Z', band: 'b-3', day: 'day-2', venue: 'v-1' },
  { id: 'st-4', start_time: '2000-01-01T23:00:00.000Z', band: 'b-4', day: 'day-1', venue: 'v-2' }
];

const days = [
  { id: 'day-2', name: 'Day 2', date: '2015-06-12' },
  { id: 'day-1', name: 'Day 1', date: '2015-06-11' }
];

const bands = [
  { id: 'b-1', name: 'Band 1' },
  { id: 'b-2', name: 'Band 2' },
  { id: 'b-3', name: 'Band 3' },
  { id: 'b-4', name: 'Band 4' }
];

const venues = [
  { id: 'v-1', name: 'Venue A' },
  { id: 'v-2', name: 'Venue B' }
];

const fullSchedule = {
  days,
  venues,
  bands,
  set_times: setTimes
};

const schedule = ['st-1', 'st-3', 'st-4'];

describe('scheduleDecorator', () => {
  it('groups schedule by day and sorts', () => {
    const result = scheduleDecorator(schedule, fullSchedule);

    expect(result.length).toEqual(2);

    expect(result[0].name).toEqual('Day 1');
    expect(result[1].name).toEqual('Day 2');
  });

  it('correctly assigns set times to day', () => {
    const result = scheduleDecorator(schedule, fullSchedule);

    expect(result[0].setTimes.length).toEqual(1);
    expect(result[1].setTimes.length).toEqual(2);
  });

  it('sorts set times by start time', () => {
    const result = scheduleDecorator(schedule, fullSchedule);

    expect(result[1].setTimes[0].id).toEqual('st-3');
    expect(result[1].setTimes[1].id).toEqual('st-1');
  });

  it('embeds band on set times', () => {
    const result = scheduleDecorator(schedule, fullSchedule);
    const setTime = result[1].setTimes[0];

    expect(setTime.band.id).toEqual('b-3');
    expect(setTime.band.name).toEqual('Band 3');
  });

  it('embeds venue on set times', () => {
    const result = scheduleDecorator(schedule, fullSchedule);
    const setTime = result[1].setTimes[0];

    expect(setTime.venue.id).toEqual('v-1');
    expect(setTime.venue.name).toEqual('Venue A');
  });
});
