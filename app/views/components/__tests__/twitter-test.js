jest.unmock('../twitter');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const Twitter = require('../twitter').default;

describe('twitter', () => {
  const Text = React.Text;

  it('renders children', () => {
    const wrapper = shallow(<Twitter><Text>Tweet</Text></Twitter>);

    expect(wrapper.contains(<Text>Tweet</Text>)).toBeTruthy();
  });

  describe('onPress', () => {
    describe('twitter app is available', () => {
      jest.setMock('../../../utils', {
        link: jest.fn(() => new Promise((resolve) => resolve()))
      });

      it('opens twitter with messahe', () => {
        const utils = require('../../../utils');

        const _Twitter = require('../twitter').default; // eslint-disable-line no-underscore-dangle
        const wrapper = shallow(<_Twitter />);
        const expectedURL = 'twitter://post?message=%23HerdFest2016';

        wrapper.simulate('press');

        expect(utils.link).toBeCalledWith(expectedURL);
      });
    });

    describe('twitter app is not available', () => {
      jest.setMock('../../../utils', {
        link: jest.fn(() => new Promise((resolve, reject) => reject()))
      });

      pit('opens google maps with address', () => {
        const utils = require('../../../utils');

        const _Twitter = require('../twitter').default; // eslint-disable-line no-underscore-dangle
        const wrapper = shallow(<_Twitter />);
        const expectedURL = 'https://twitter.com/intent/tweet?text=%23HerdFest2016';

        return wrapper.props().onPress().catch(() => {
          expect(utils.link).toBeCalledWith(expectedURL);
        });
      });
    });
  });
});
