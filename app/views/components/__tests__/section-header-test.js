jest.unmock('../section-header');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const SectionHeader = require('../section-header').default;

describe('SectionHeader', () => {
  const Text = React.Text;

  it('renders props.title', () => {
    const title = 'Test';
    const wrapper = shallow(<SectionHeader title={title} />);

    expect(wrapper.find(Text).first().prop('children')).toEqual(title);
  });

  it('sets background color if passed in props.backgroundColor', () => {
    const backgroundColor = '#ccc';
    const wrapper = shallow(<SectionHeader backgroundColor={backgroundColor} />);

    expect(wrapper.prop('style')[1]).toEqual({ backgroundColor });
  });
});
