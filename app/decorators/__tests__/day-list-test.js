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
  { id: 'st-1', start_time: '2000-01-01T20:00:00.000Z', band: 'b-1', venue: 'v-1' },
  { id: 'st-2', start_time: '2000-01-01T01:00:00.000Z', band: 'b-1', venue: 'v-1' },
  { id: 'st-3', start_time: '2000-01-01T01:00:00.000Z', band: 'b-3', venue: 'v-2' },
  { id: 'st-4', start_time: '2000-01-01T23:00:00.000Z', band: 'b-4', venue: 'v-2' }
];

const fullSchedule = {
  days: [day],
  venues,
  bands,
  set_times: setTimes
};

describe('dayListDecorator', () => {
  it('converts day', () => {
    const result = dayListDecorator(day, fullSchedule);

    expect(result.id).toEqual(day.id);
    expect(result.name).toEqual(day.name);
  });

  it('embeds and sorts venues on day', () => {
    const result = dayListDecorator(day, fullSchedule);

    expect(result.venues.length).toEqual(2);
    expect(result.venues[0].name).toEqual('Venue A');
    expect(result.venues[1].name).toEqual('Venue B');
  });

  it('embeds and sorts set times on venues', () => {
    const result = dayListDecorator(day, fullSchedule);
    const venue = result.venues[0];

    expect(venue.setTimes.length).toEqual(2);
    expect(venue.setTimes[0].id).toEqual('st-4');
    expect(venue.setTimes[1].id).toEqual('st-3');
  });

  it('embeds and sorts bands on set times', () => {
    const result = dayListDecorator(day, fullSchedule);
    const venue = result.venues[0];
    const setTime = venue.setTimes[0];

    expect(setTime.band.name).toEqual('Band 4');
  });
});
