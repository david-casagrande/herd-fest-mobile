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
    renderer._instance._instance.setState(state);
  }

  const output = renderer.getRenderOutput();

  return {
    output,
    instance
  };
}

function setMock() {
  jest.setMock('../data/full-schedule', {
    get: function() {
      return new Promise((resolve) => resolve({}));
    }
  });
}

describe('Home', function() {
  let component;

  beforeEach(function() {
    setMock();
    component = require('../home').default;
  });

  it('sorts and renders the days', function() {
    const home = renderScreen(component, null, { fullSchedule: { days } });
    const homeDays = home.output.props.children[1];

    expect(homeDays[0].props.children).toEqual('Day 1');
    expect(homeDays[1].props.children).toEqual('Day 2');
  });

  it('navigates to day', function() {
    const expected = { name: 'Day', index: 1, title: 'Day 1', day_id: '2' }
    const navigator = {
      push: function(data) {
        expect(data).toEqual(expected);
      }
    };

    const home = renderScreen(component, { navigator }, { fullSchedule: { days } });
    const homeDays = home.output.props.children[1];

    homeDays[0].props.onPress();
  });
});
