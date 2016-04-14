jest.unmock('../left-button-nav');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const LeftButtonNav = require('../left-button-nav').default;

describe('LeftButtonNav', () => {
  const Text = React.Text;

  let props = null;

  beforeEach(() => {
    props = {
      index: 1,
      navigator: { pop: jest.fn() }
    };
  });

  it('returns false if props.index less than 1', () => {
    props.index = 0;
    const wrapper = shallow(<LeftButtonNav {...props} />);

    expect(wrapper.node).toBeFalsy();
  });

  it('render an Text', () => {
    const wrapper = shallow(<LeftButtonNav {...props} />);

    expect(wrapper.find(Text).prop('children')).toEqual('Back');
  });

  it('handles onPress', () => {
    const wrapper = shallow(<LeftButtonNav {...props} />);

    wrapper.simulate('press');

    expect(props.navigator.pop).toBeCalled();
  });
});
