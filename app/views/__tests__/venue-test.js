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
  it('renders', () => {
    const component = require('../venue').default;
    const venue = testUtils.render(component, { venue: venues[0], fullSchedule });
    expect(venue.output.props.children.props.children.props.children).toEqual(venues[0].street_address);
  });

  describe('link to street address', () => {
    describe('using google maps app', () => {
      it('links to address via google maps if it can', () => {
        jest.setMock('../../utils', {
          link: jest.fn(() => new Promise((resolve) => resolve(true)))
        });

        const component = require('../venue').default;
        const venue = testUtils.render(component, { venue: venues[0], fullSchedule });
        const utils = require('../../utils');
        const expectedAddress = `comgooglemaps://?q=${venues[0].street_address}, Buffalo, NY`;

        venue.output.props.children.props.onPress();

        expect(utils.link).toBeCalledWith(expectedAddress);
      });
    });

    describe('using google maps web', () => {
      pit('links to address via google maps web', () => {
        jest.setMock('../../utils', {
          link: jest.fn(() => new Promise((resolve, reject) => reject()))
        });

        const component = require('../venue').default;
        const venue = testUtils.render(component, { venue: venues[0], fullSchedule });
        const utils = require('../../utils');
        const expectedAddress = `https://maps.google.com/?q=${venues[0].street_address}, Buffalo, NY`;

        return venue.output.props.children.props.onPress().catch(() => {
          expect(utils.link).toBeCalledWith(expectedAddress);
        });
      });
    });
  });
});
