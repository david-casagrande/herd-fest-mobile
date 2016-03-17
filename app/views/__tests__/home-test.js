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

  describe('toolbar', () => {
    let navigator = null;
    let home = null;
    let toolbar = null;

    beforeEach(() => {
      navigator = { push: jest.fn() };
      home = testUtils.render(component, { navigator, fullSchedule: { days } });
      toolbar = home.output.props.children[1];
    });

    it('handles schedule', () => {
      const expected = { name: 'Schedule', index: 1, title: 'My Schedule' };

      toolbar.props.onPress('Schedule');

      expect(navigator.push.mock.calls[0].length).toEqual(1);
      expect(navigator.push.mock.calls[0][0]).toEqual(expected);
    });

    it('handles bands', () => {
      const expected = { name: 'Bands', index: 1, title: 'Bands' };

      toolbar.props.onPress('Bands');

      expect(navigator.push.mock.calls[0].length).toEqual(1);
      expect(navigator.push.mock.calls[0][0]).toEqual(expected);
    });

    it('handles venues', () => {
      const expected = { name: 'Venues', index: 1, title: 'Venues' };

      toolbar.props.onPress('Venues');

      expect(navigator.push.mock.calls[0].length).toEqual(1);
      expect(navigator.push.mock.calls[0][0]).toEqual(expected);
    });
  });
});
