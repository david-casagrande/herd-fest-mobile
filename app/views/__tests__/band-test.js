jest.dontMock('../../utils');
jest.dontMock('../../data/serializers');
jest.dontMock('../band');

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
  testUtils.fabricate('setTime', { id: 'st-1', band: bands[0].id, venue: venues[0].id, day: days[0].id })
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
    const expected = 4;
    expect(band.output.props.children.length).toEqual(expected);
  });
});
