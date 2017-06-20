import 'react-native';
import React from 'react';
import HomeContainer from '../Home';

import { shallow } from 'enzyme';

describe('HomeContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      }
    };
  });

  it('HomeView', () => {
    const wrapper = shallow(<HomeContainer {...props} />);
    const view = wrapper.find('HomeView');

    view.simulate('navigate', 'Test');
    expect(props.navigation.navigate).toBeCalledWith('Test');
  });
});
