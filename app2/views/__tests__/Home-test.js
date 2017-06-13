import 'react-native';
import React from 'react';
import HomeView from '../Home';

import { shallow } from 'enzyme';
jest.mock('../../images/home.png', () => 'img');

describe('HomeView', () => {
  let props = null;
  let context = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };
  });

  it('image', () => {
    const wrapper = shallow(<HomeView {...props} />);
    const img = wrapper.find('Image');

    expect(img.prop('source')).toEqual('img')
  });

  it('links', () => {
    const wrapper = shallow(<HomeView {...props} />);
    const links = wrapper.find('TouchableOpacity');

    links.at(0).simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('Schedule');

    links.at(1).simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('MySchedule');

    links.at(2).simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('Bands');

    links.at(3).simulate('press');
    expect(props.navigation.navigate).toBeCalledWith('Venues');
  });
});
