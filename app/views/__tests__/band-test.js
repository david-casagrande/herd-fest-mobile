jest.dontMock('lodash');
jest.dontMock('../band');

const testUtils = require('../../test-utils');

const bands = [
  {
    id: 'b-1',
    name: 'Band 1',
    set_times: ['st-1']
  }
];

const venues = [
  {
    id: 'v-1',
    name: 'Venue 1'
  }
];

const days = [
  {
    id: 'd-1',
    name: 'Day 1'
  }
];

const setTimes = [
  {
    id: 'st-1',
    band: bands[0].id,
    venue: venues[0].id,
    day: days[0].id
  }
];

const fullSchedule = {
  set_times: setTimes,
  bands,
  venues,
  days
};

describe('Band', () => {
  let component = null;

  beforeEach(() => {
    component = require('../band').default;
  });

  it('renders', () => {
    const band = testUtils.render(component, { band: bands[0], fullSchedule });
    expect(band.output.props.children.length).toEqual(4);
  });
});
