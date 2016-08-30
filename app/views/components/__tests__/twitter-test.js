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
      it('opens twitter with message', () => {
        jest.doMock('../../../utils', () => {
          return {
            link: jest.fn(() => new Promise((resolve) => resolve()))
          };
        });

        const utils = require('../../../utils');

        const Twitter = require('../twitter').default; // eslint-disable-line no-underscore-dangle
        const wrapper = shallow(<Twitter />);
        const expectedURL = 'twitter://post?message=%23HerdFest2016';

        wrapper.simulate('press');

        expect(utils.link).toBeCalledWith(expectedURL);
      });
    });

    describe('twitter app is not available', () => {
      it('opens google maps with address', () => {
        jest.doMock('../../../utils', () => {
          return {
            link: jest.fn(() => new Promise((resolve, reject) => reject()))
          };
        });

        const utils = require('../../../utils');

        const Twitter = require('../twitter').default; // eslint-disable-line no-underscore-dangle
        const wrapper = shallow(<Twitter />);
        const expectedURL = 'https://twitter.com/intent/tweet?text=%23HerdFest2016';

        return wrapper.props().onPress().catch(() => {
          expect(utils.link).toBeCalledWith(expectedURL);
        });
      });
    });
  });
});
