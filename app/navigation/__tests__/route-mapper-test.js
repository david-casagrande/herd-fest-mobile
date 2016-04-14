jest.unmock('../left-button-nav');
jest.unmock('../right-button-nav');
jest.unmock('../title-nav');
jest.unmock('../route-mapper');

const LeftButtonNav = require('../left-button-nav').default;
const RightButtonNav = require('../right-button-nav').default;
const RouteMapper = require('../route-mapper').default;
const TitleNav = require('../title-nav').default;

describe('RouteMapper', () => {
  let route = null;
  let navigator = null;
  let index = null;

  beforeEach(() => {
    route = { name: 'route' };
    navigator = { props: {} };
    index = 1;
  });

  describe('.LeftButton', () => {
    it('renders LeftButtonNav', () => {
      const wrapper = RouteMapper.LeftButton(route, navigator, index);

      expect(wrapper.type).toEqual(LeftButtonNav);
      expect(wrapper.props.route).toEqual(route);
      expect(wrapper.props.navigator).toEqual(navigator);
      expect(wrapper.props.index).toEqual(index);
    });
  });

  describe('.RightButton', () => {
    it('renders RightButtonNav', () => {
      const wrapper = RouteMapper.RightButton(route, navigator, index);

      expect(wrapper.type).toEqual(RightButtonNav);
      expect(wrapper.props.route).toEqual(route);
      expect(wrapper.props.navigator).toEqual(navigator);
      expect(wrapper.props.index).toEqual(index);
    });
  });

  describe('.Title', () => {
    it('renders TitleNav', () => {
      const wrapper = RouteMapper.Title(route, navigator, index);

      expect(wrapper.type).toEqual(TitleNav);
      expect(wrapper.props.route).toEqual(route);
      expect(wrapper.props.navigator).toEqual(navigator);
      expect(wrapper.props.index).toEqual(index);
    });
  });
});
