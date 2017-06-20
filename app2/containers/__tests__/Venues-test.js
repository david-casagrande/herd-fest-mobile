import 'react-native';
import React from 'react';
import VenuesContainer from '../Venues';

import { shallow } from 'enzyme';

describe('VenuesContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn()
      },
      screenProps: {
        venues: []
      }
    };
  });

  it('VenuesView', () => {
    const wrapper = shallow(<VenuesContainer {...props} />);
    const view = wrapper.find('VenuesView');

    view.simulate('navigate', 'Venue', { id: '1' });
    expect(props.navigation.navigate).toBeCalledWith('Venue', { id: '1' });
  });
});
