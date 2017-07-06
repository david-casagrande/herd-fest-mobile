import 'react-native';
import React from 'react';
import VenuesView from '../Venues';

import { shallow } from 'enzyme';

describe('VenuesView', () => {
  let props = null;

  beforeEach(() => {
    props = {
      onNavigate: jest.fn(),
      venues: []
    };
  });

  it('renders HFFlatList with context.bands', () => {
    const wrapper = shallow(<VenuesView {...props} />);
    const list = wrapper.find('HFFlatList');

    expect(list.prop('data')).toEqual(props.venues);
    expect(list.prop('keyProp')).toEqual('id');
    expect(list.prop('labelProp')).toEqual('name');

    const item = { id: '1' };
    list.props().onPress(item);

    expect(props.onNavigate).toBeCalledWith('Venue', item);
  });
});
