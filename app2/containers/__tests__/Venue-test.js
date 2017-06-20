import 'react-native';
import React from 'react';
import VenueContainer from '../Venue';

import { shallow } from 'enzyme';

describe('VenuesContainer', () => {
  let props = null;

  beforeEach(() => {
    props = {
      navigation: {
        navigate: jest.fn(),
        state: {
          params: { id: '1', set_times: [] }
        }
      }
    };
  });

  it('VenueView', () => {
    const wrapper = shallow(<VenueContainer {...props} />);
    const view = wrapper.find('VenueView');

    expect(view.prop('venue')).toEqual(props.navigation.state.params);
  });
});
