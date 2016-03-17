jest.dontMock('lodash');
jest.dontMock('../venue');

const testUtils = require('../../test-utils');

const bands = [
  testUtils.fabricate('band', { set_times: ['st-1'] })
];

const venues = [
  testUtils.fabricate('venue')
];

const days = [
  testUtils.fabricate('day')
];

const setTimes = [
  testUtils.fabricate('setTime', { band: bands[0].id, venue: venues[0].id, day: days[0] })
];

const fullSchedule = {
  set_times: setTimes,
  bands,
  venues,
  days
};

describe('Venue', () => {
  let component = null;

  beforeEach(() => {
    component = require('../venue').default;
  });

  it('renders', () => {
    const venue = testUtils.render(component, { venue: venues[0], fullSchedule });
    expect(venue.output.props.children.props.children.props.children).toEqual(venues[0].street_address);
  });
});
