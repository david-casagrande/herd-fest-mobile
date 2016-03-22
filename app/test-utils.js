const React = require('react');
const utils = require('react/lib/ReactTestUtils');

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

const fabricators = {
  band() {
    return {
      id: 'b-1',
      name: 'Wavves',
      description: 'Lorem Ipsum Band Description',
      image_url: null,
      set_times: [],
      venues: []
    };
  },

  venue() {
    return {
      id: 'v-1',
      name: 'The Pink',
      street_address: '111 Allen St',
      set_times: [],
      venues: []
    };
  },

  day() {
    return {
      id: 'd-1',
      name: 'Day 1',
      bands: [],
      venues: [],
      set_times: []
    };
  },

  setTime() {
    return {
      id: 'st-1',
      name: 'Day 1',
      bands: [],
      venues: [],
      set_times: []
    };
  }
};

function fabricate(type, opts) {
  const model = fabricators[type]();
  return Object.assign(model, opts);
}

const testUtils = {
  render,
  fabricate
};

module.exports = Object.freeze(testUtils);
