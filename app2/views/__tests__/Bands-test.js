import 'react-native';
import React from 'react';
import BandsView from '../Bands';

import { shallow } from 'enzyme';

describe('BandsView', () => {
  let props = null;
  let context = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };

    context = { bands: [] };
  });

  it('renders HFFlatList with context.bands', () => {
    const wrapper = shallow(<BandsView {...props} />, { context });
    const list = wrapper.find('HFFlatList');

    expect(list.prop('data')).toEqual(context.bands);
    expect(list.prop('keyProp')).toEqual('id');
    expect(list.prop('labelProp')).toEqual('name');

    const item = { id: '1' };
    list.props().onPress(item);

    expect(props.navigation.navigate).toBeCalledWith('Band', item);
  });
});
