import 'react-native';
import React from 'react';
import VenueView from '../Venue';

import { shallow } from 'enzyme';

describe('VenueView', () => {
  let props = null;

  beforeEach(() => {
    props = {
      venue: {
        set_times: []
      }
    };
  });

  it('lives', () => {
    shallow(<VenueView {...props} />);
  });
});
