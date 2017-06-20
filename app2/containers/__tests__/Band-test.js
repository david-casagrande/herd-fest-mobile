import 'react-native';
import React from 'react';
import BandContainer from '../Band';

import { shallow } from 'enzyme';

describe('BandContainer', () => {
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

  it('BandView', () => {
    const wrapper = shallow(<BandContainer {...props} />);
    const view = wrapper.find('BandView');

    expect(view.prop('band')).toEqual(props.navigation.state.params);
  });
});
