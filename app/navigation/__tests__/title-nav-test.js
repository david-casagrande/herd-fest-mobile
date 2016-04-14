jest.unmock('../title-nav');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const TitleNav = require('../title-nav').default;

describe('TitleNav', () => {
  const Text = React.Text;

  let props = null;

  beforeEach(() => {
    props = {
      index: 1,
      route: { name: null, id: null, title: null },
      navigator: {
        props: {
          fullSchedule: {
            venues: [{ id: 'v-1', street_address: '111 St' }]
          }
        }
      }
    };
  });

  it('returns false if props.index is less than 1', () => {
    props.index = 0;
    const wrapper = shallow(<TitleNav {...props} />);

    expect(wrapper.node).toBeFalsy();
  });

  it('renders venue name and address if props.route.name is Venue', () => {
    props.route = { name: 'Venue', id: 'v-1' };
    const wrapper = shallow(<TitleNav {...props} />);

    expect(wrapper.find(Text).first().prop('children')).toEqual(props.navigator.props.fullSchedule.venues[0].name);
    expect(wrapper.find(Text).last().prop('children')).toEqual(props.navigator.props.fullSchedule.venues[0].street_address);
  });

  it('returns false if props.route.name is Venue but props.route.id is not in props.navigator.props.fullSchedule.venues', () => {
    props.route = { name: 'Venue', id: 'v-2' };
    const wrapper = shallow(<TitleNav {...props} />);

    expect(wrapper.node).toBeFalsy();
  });

  it('renders props.route.title if props.index is greater than 0 and props.route.name is not Venue', () => {
    props.route = { name: 'Band', title: 'Band Name' };
    const wrapper = shallow(<TitleNav {...props} />);

    expect(wrapper.find(Text).first().prop('children')).toEqual(props.route.title);
  });
});
