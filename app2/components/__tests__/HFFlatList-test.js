import 'react-native';
import React from 'react';
import HFFlatList from '../HFFlatList';
import { shallow } from 'enzyme';

// FlatList returns undefined when we dont mock it, try to remove this when updated react-native
// https://github.com/facebook/react-native/issues/14514
jest.mock('react-native', () => ({
  FlatList: () => false,
  StyleSheet: {},
  TouchableOpacity: () => false,
  Text: () => false,
  View: () => false
}));

describe('HFFlatList', () => {
  let props = null;

  beforeEach(() => {
    props = {
      data: [{ id: '1', name: 'Test' }],
      keyProp: 'id',
      labelProp: 'name',
      onPress: jest.fn()
    };
  });

  it('renders a FlatList', () => {
    const wrapper = shallow(<HFFlatList {...props} />);
    const list = wrapper.find('FlatList');

    expect(list.prop('data')).toEqual(props.data);
  });

  it('keyExtractor based on props.keyProp', () => {
    const wrapper = shallow(<HFFlatList {...props} />);
    const list = wrapper.find('FlatList');

    expect(list.props().keyExtractor(props.data[0])).toEqual('1');
  });

  it('item', () => {
    const wrapper = shallow(<HFFlatList {...props} />);
    const list = wrapper.find('FlatList');
    const item = list.props().renderItem({ item: props.data[0] });
    const label = item.props.children;

    expect(label.props.children).toEqual('Test');

    item.props.onPress();

    expect(props.onPress).toBeCalledWith(props.data[0]);
  });

  it('separator', () => {
    const wrapper = shallow(<HFFlatList {...props} />);
    const list = wrapper.find('FlatList');
    const separator = list.props().ItemSeparatorComponent();

    expect(separator.props.style).toBeDefined();
  });
});
