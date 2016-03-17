jest.dontMock('lodash');
jest.dontMock('../home');

const testUtils = require('../../test-utils');

const days = [
  {
    id: '1',
    name: 'Day 2'
  },
  {
    id: '2',
    name: 'Day 1'
  }
];

describe('Home', () => {
  let component = null;

  beforeEach(() => {
    component = require('../home').default;
  });

  it('sorts and renders the days', () => {
    const home = testUtils.render(component, { fullSchedule: { days } });
    const homeDays = home.output.props.children[0].props.children[1];

    expect(homeDays[0].props.children.props.children).toEqual('Day 1');
    expect(homeDays[1].props.children.props.children).toEqual('Day 2');
  });

  it('navigates to day', () => {
    const expected = { name: 'Day', index: 1, title: 'Day 1', id: '2' }; // eslint-disable-line id-match
    const navigator = {
      push: (data) => {
        expect(data).toEqual(expected);
      }
    };

    const home = testUtils.render(component, { navigator, fullSchedule: { days } });
    const homeDays = home.output.props.children[0].props.children[1];

    homeDays[0].props.onPress();
  });
});
