const React = require('react-native/node_modules/react');
const utils = require('react-native/node_modules/react/lib/ReactTestUtils');

function render(component, props = {}, state) {
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

const testUtils = {
  render
};

module.exports = Object.freeze(testUtils);
