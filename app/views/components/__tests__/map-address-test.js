jest.unmock('../map-address');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const MapAddress = require('../map-address').default;

describe('MapAddress', () => {
  const Text = React.Text;

  it('renders children', () => {
    const wrapper = shallow(<MapAddress address={'address'}><Text>Map</Text></MapAddress>);

    expect(wrapper.contains(<Text>Map</Text>)).toBeTruthy();
  });

  describe('onPress', () => {
    const address = '111 Test Drive';
    const fullAddress = `${address}, Buffalo, NY`;

    describe('google maps app is available', () => {
      jest.setMock('../../../utils', {
        link: jest.fn(() => new Promise((resolve) => resolve()))
      });

      it('opens google maps with address', () => {
        utils = require('../../../utils');

        const _MapAddress = require('../map-address').default;
        const wrapper = shallow(<_MapAddress address={address} />);
        const expectedAddress = `comgooglemaps://?q=${fullAddress}`;

        wrapper.simulate('press');

        expect(utils.link).toBeCalledWith(expectedAddress);
      });
    });

    describe('google maps app is not available', () => {
      jest.setMock('../../../utils', {
        link: jest.fn(() => new Promise((resolve, reject) => reject()))
      });

      pit('opens google maps with address', () => {
        utils = require('../../../utils');

        const _MapAddress = require('../map-address').default;
        const wrapper = shallow(<_MapAddress address={address} />);
        const expectedAddress = `https://maps.google.com/?q=${fullAddress}`;

        return wrapper.props().onPress().catch(() => {
          expect(utils.link).toBeCalledWith(expectedAddress);
        });
      });
    });
  });
});
