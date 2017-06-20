import 'react-native';
import React from 'react';
import BandsContainer from '../Bands';

import { shallow } from 'enzyme';

describe('BandsContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      },
      screenProps: {
        bands: []
      }
    };
  });

  it('BandsView', () => {
    const wrapper = shallow(<BandsContainer {...props} />);
    const view = wrapper.find('BandsView');

    view.simulate('navigate', 'Band', { id: '1' });
    expect(props.navigation.navigate).toBeCalledWith('Band', { id: '1' });
  });
});
