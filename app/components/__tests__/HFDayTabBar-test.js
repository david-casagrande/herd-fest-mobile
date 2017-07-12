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
        }
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
    expect(day1.prop('style')[3]).toEqual({ borderColor: 'transparent' });

    day2.find('TouchableOpacity').props().onPress();
    expect(props.jumpToIndex).toBeCalledWith(1);
    expect(day2.prop('style')[1]).toEqual({ borderColor: colors.pinWheel[0] });
    expect(day2.prop('style')[2]).not.toBeDefined();
  });
});
