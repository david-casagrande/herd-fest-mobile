jest.dontMock('../twitter');

const testUtils = require('../../../test-utils');

describe('twitter', () => {
  it('renders', () => {
    const component = require('../twitter').default;
    const twitter = testUtils.render(component);

    expect(twitter.output.props.children.props.children).toEqual('Tweet');
  });

  describe('post to twitter', () => {
    it('posts to twitter app', () => {
      jest.setMock('../../../utils', {
        link: jest.fn(() => new Promise((resolve) => resolve()))
      });

      const component = require('../twitter').default;
      const twitter = testUtils.render(component);

      twitter.output.props.onPress();

      const utils = require('../../../utils');

      expect(utils.link).toBeCalledWith('twitter://post?message=%23HerdFest2016');
    });

    pit('posts to twitter web if twitter app fails', () => {
      jest.setMock('../../../utils', {
        link: jest.fn(() => new Promise((resolve, reject) => reject()))
      });

      const component = require('../twitter').default;
      const twitter = testUtils.render(component);

      const utils = require('../../../utils');

      return twitter.output.props.onPress().catch(() => {
        expect(utils.link).toBeCalledWith('twitter://post?message=%23HerdFest2016');
        expect(utils.link).toBeCalledWith('https://twitter.com/intent/tweet?text=%23HerdFest2016');
      });
    });
  });
});
