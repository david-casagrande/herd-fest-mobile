import 'react-native';
import React from 'react';
import HFDayTabBar from '../HFDayTabBar';
import colors from '../../styles/_colors.js';
import { shallow } from 'enzyme';

describe('HFDayTabBar', () => {
  let props = null;

  beforeEach(() => {
    props = {
      jumpToIndex: jest.fn(),
      navigation: {
        navigate: jest.fn(),
        state: {
          index: 0,
          routeName: 'Test',
          routes: [{ routeName: 'Test' }, { routeName: 'Test 2' }]
        },
      }
    };
  });

  it('onPress', () => {
    const wrapper = shallow(<HFDayTabBar {...props} />);
    const days = wrapper.find('[data-id="day"]');
    const day1 = days.first();
    const day2 = days.last();

    expect(days.length).toEqual(props.navigation.state.routes.length);

    day1.find('TouchableOpacity').props().onPress();
    expect(props.jumpToIndex).toBeCalledWith(0);
    expect(day1.prop('style')[1]).toEqual({ borderColor: colors.pinWheel[0] });
    expect(day1.prop('style')[2]).toEqual({ backgroundColor: colors.pinWheel[0] });

    day2.find('TouchableOpacity').props().onPress();
    expect(props.jumpToIndex).toBeCalledWith(1);
    expect(day2.prop('style')[1]).toEqual({ borderColor: colors.pinWheel[0] });
    expect(day2.prop('style')[2]).not.toBeDefined();
  });

  // it('keyExtractor based on props.keyProp', () => {
  //   const wrapper = shallow(<HFFlatList {...props} />);
  //   const list = wrapper.find('FlatList');
  //
  //   expect(list.props().keyExtractor(props.data[0])).toEqual('1');
  // });
  //
  // it('item', () => {
  //   const wrapper = shallow(<HFFlatList {...props} />);
  //   const list = wrapper.find('FlatList');
  //   const item = list.props().renderItem({ item: props.data[0] });
  //   const label = item.props.children;
  //
  //   expect(label.props.children).toEqual('Test');
  //
  //   item.props.onPress();
  //
  //   expect(props.onPress).toBeCalledWith(props.data[0]);
  // });
  //
  // it('separator', () => {
  //   const wrapper = shallow(<HFFlatList {...props} />);
  //   const list = wrapper.find('FlatList');
  //   const separator = list.props().ItemSeparatorComponent();
  //
  //   expect(separator.props.style).toBeDefined();
  // });
});
