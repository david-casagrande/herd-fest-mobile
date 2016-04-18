jest.unmock('../data-error');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const DataError = require('../data-error').default;

describe('Band', () => {
  const Text = React.Text;

  it('render an emoji', () => {
    const wrapper = shallow(<DataError />);
    expect(wrapper.find(Text).first().prop('children')).toEqual('💩');
  });
});
