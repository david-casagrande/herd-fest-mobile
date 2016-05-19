jest.unmock('../right-button-nav');
jest.unmock('../../views/components/map-address');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const RightButtonNav = require('../right-button-nav').default;
const MapAddress = require('../../views/components/map-address').default;

describe('RightButtonNav', () => {
  const Text = React.Text;

  let props = null;

  beforeEach(() => {
    props = {
      route: { name: null, id: null },
      navigator: {
        props: {
          fullSchedule: {
            venues: [{ id: 'v-1', street_address: '111 St' }]
          }
        }
      }
    };
  });

  it('returns false if props.route.name does not equal Venue', () => {
    const wrapper = shallow(<RightButtonNav {...props} />);

    expect(wrapper.node).toBeFalsy();
  });

  it('renders MapAddress if props.route.name is Venue', () => {
    props.route = { name: 'Venue', id: 'v-1' };
    const wrapper = shallow(<RightButtonNav {...props} />);

    expect(wrapper.find(MapAddress).length).toEqual(1);

    expect(wrapper.find(MapAddress).prop('address')).toEqual(props.navigator.props.fullSchedule.venues[0].street_address);
    expect(wrapper.find(Text).prop('children')).toEqual('Map');
  });

  it('returns false if props.route.name is Venue but props.route.id is not in props.navigator.props.fullSchedule.venues', () => {
    props.route = { name: 'Venue', id: 'v-2' };
    const wrapper = shallow(<RightButtonNav {...props} />);

    expect(wrapper.node).toBeFalsy();
  });
});
