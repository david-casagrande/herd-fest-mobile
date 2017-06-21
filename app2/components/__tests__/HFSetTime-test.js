import 'react-native';
import React from 'react';
import HFSetTime from '../HFSetTime';
import { shallow } from 'enzyme';
import moment from 'moment';

describe('HFSetTime', () => {
  let props = null;

  beforeEach(() => {
    props = {
      setTime: {
        start_time: '2000-01-01T23:15:00.000Z',
        band: {
          name: 'Band'
        }
      }
    };
  });

  it('renders', () => {
    const wrapper = shallow(<HFSetTime {...props} />);
    const startTime = wrapper.find('[data-id="start-time"]');
    const band = wrapper.find('[data-id="band"]');

    expect(startTime.prop('children')).toEqual(moment.utc(props.setTime.start_time).format('h:mmA'));
    expect(band.prop('children')).toEqual('Band');
  });

  it('onPress', () => {
    props.onPress = jest.fn();
    const wrapper = shallow(<HFSetTime {...props} />);
    const btn = wrapper.find('TouchableOpacity');
    const band = wrapper.find('[data-id="band"]');

    expect(band.prop('children')).toEqual('Band');

    btn.simulate('press');

    expect(props.onPress).toBeCalledWith(props.setTime);
  });

  it('tintColor', () => {
    props.tintColor = '#000';
    const wrapper = shallow(<HFSetTime {...props} />);
    const startTime = wrapper.find('[data-id="start-time"]');
    expect(startTime.prop('style')[1]).toEqual({ color: props.tintColor });
  });
});
