jest.dontMock('lodash');
jest.dontMock('../home');

const React = require('react-native/node_modules/react');
const utils = require('react-native/node_modules/react/lib/ReactTestUtils');

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

function renderScreen(component, props = {}, state) {
  const renderer = utils.createRenderer();
  const instance = React.createElement(component, props);

  renderer.render(instance);

  if (state) {
    renderer._instance._instance.setState(state); // eslint-disable-line no-underscore-dangle
  }

  const output = renderer.getRenderOutput();

  return {
    output,
    instance
  };
}

function setMock() {
  jest.setMock('../data/full-schedule', {
    get() {
      return new Promise((resolve) => resolve({}));
    }
  });
}

xdescribe('Home', () => {
  let component = null;

  beforeEach(() => {
    setMock();
    component = require('../home').default;
  });

  xit('gets full schedule on init', () => null);

  it('sorts and renders the days', () => {
    const home = renderScreen(component, null, { fullSchedule: { days } });
    const homeDays = home.output.props.children[1];

    expect(homeDays[0].props.children.props.children).toEqual('Day 1');
    expect(homeDays[1].props.children.props.children).toEqual('Day 2');
  });

  it('navigates to day', () => {
    const expected = { name: 'Day', index: 1, title: 'Day 1', day_id: '2' }; // eslint-disable-line id-match
    const navigator = {
      push: (data) => {
        expect(data).toEqual(expected);
      }
    };

    const home = renderScreen(component, { navigator }, { fullSchedule: { days } });
    const homeDays = home.output.props.children[1];

    homeDays[0].props.onPress();
  });
});
