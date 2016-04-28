jest.unmock('../home');
jest.mock('../../images/home.png', () => '../images/home.png');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const Home = require('../home').default;

describe('Home', () => {
  const Image = React.Image;
  const TouchableOpacity = React.TouchableOpacity;
  const Text = React.Text;
  const Animated = React.Animated;

  let navigator = null;

  beforeEach(() => {
    navigator = {
      push: jest.fn()
    };
  });

  it('sets initial state.opacityAnim', () => {
    const wrapper = shallow(<Home />);

    expect(Animated.Value).toBeCalledWith(0);
    expect(wrapper.state().opacityAnim).toEqual(new Animated.Value(0));
  });

  describe('Image', () => {
    it('renders an Image', () => {
      const wrapper = shallow(<Home navigator={navigator} />);

      expect(wrapper.contains(Image)).toBeTruthy();

      const img = wrapper.find(Image).first();

      expect(img.prop('source')).toEqual('../images/home.png');
    });

    it('handles onLoad', () => {
      const wrapper = shallow(<Home />);
      const img = wrapper.find(Image).first();

      img.props().onLoad();

      expect(Animated.timing).toBeCalledWith(wrapper.state().opacityAnim, { toValue: 1, duration: Home.duration });
    });
  });

  describe('links', () => {
    const links = ['Schedule', 'My Schedule', 'Bands', 'Venues'];
    let wrapper = null;

    beforeEach(() => {
      wrapper = shallow(<Home navigator={navigator} />);
    });

    it('renders four TouchableOpacity items', () => {
      const expectedLinks = 4;

      expect(wrapper.find(TouchableOpacity).length).toEqual(expectedLinks);
    });

    links.forEach((name, idx) => {
      it('renders schedule link', () => {
        const link = wrapper.find(TouchableOpacity).at(idx);
        const text = link.find(Text).first();

        expect(text.props().children).toEqual(name.toUpperCase());

        link.props().onPress();

        const expectedProps = { name, title: name, index: 1 };
        expect(navigator.push).toBeCalledWith(expectedProps);
      });
    });
  });
});
