import 'react-native';
import React from 'react';
import VenuesView from '../Venues';

import { shallow } from 'enzyme';

describe('VenuesView', () => {
  let props = null;
  let context = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };

    context = { venues: [] };
  });

  it('renders HFFlatList with context.bands', () => {
    const wrapper = shallow(<VenuesView {...props} />, { context });
    const list = wrapper.find('HFFlatList');

    expect(list.prop('data')).toEqual(context.venues);
    expect(list.prop('keyProp')).toEqual('id');
    expect(list.prop('labelProp')).toEqual('name');

    const item = { id: '1' };
    list.props().onPress(item);

    expect(props.navigation.navigate).toBeCalledWith('Venue', item);
  });
});
