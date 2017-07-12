import 'react-native';
import React from 'react';
import HomeView from '../Home';

import { shallow } from 'enzyme';
jest.mock('../../images/home.png', () => 'img');

describe('HomeView', () => {
  let props = null;

  beforeEach(() => {
    props = {
      onNavigate: jest.fn()
    };
  });

  it('image', () => {
    const wrapper = shallow(<HomeView {...props} />);
    const img = wrapper.find('Image');

    expect(img.prop('source')).toEqual('img');
  });

  it('links', () => {
    const wrapper = shallow(<HomeView {...props} />);
    const links = wrapper.find('TouchableOpacity');

    links.at(0).simulate('press');
    expect(props.onNavigate).toBeCalledWith('Schedule');

    links.at(1).simulate('press');
    expect(props.onNavigate).toBeCalledWith('MySchedule');

    links.at(2).simulate('press');
    expect(props.onNavigate).toBeCalledWith('Bands');

    links.at(3).simulate('press'); // eslint-disable-line no-magic-numbers
    expect(props.onNavigate).toBeCalledWith('Venues');
  });
});
