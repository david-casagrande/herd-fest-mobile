import 'react-native';
import React from 'react';
import BandsView from '../Bands';

import { shallow } from 'enzyme';

describe('BandsView', () => {
  let props = null;

  beforeEach(() => {
    props = {
      onNavigate: jest.fn(),
      bands: []
    };
  });

  it('renders HFFlatList with context.bands', () => {
    const wrapper = shallow(<BandsView {...props} />);
    const list = wrapper.find('HFFlatList');

    expect(list.prop('data')).toEqual(props.bands);
    expect(list.prop('keyProp')).toEqual('id');
    expect(list.prop('labelProp')).toEqual('name');

    const item = { id: '1' };
    list.props().onPress(item);

    expect(props.onNavigate).toBeCalledWith('Band', item);
  });
});
