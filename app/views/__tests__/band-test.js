import 'react-native';
import React from 'react';
import BandView from '../Band';

import { shallow } from 'enzyme';

describe('BandView', () => {
  let props = null;

  beforeEach(() => {
    props = {
      band: {
        name: 'Band Name',
        description: 'Band Description',
        image_url: 'image-url',
        set_times: []
      }
    };
  });

  describe('name', () => {
    it('renders based on name', () => {
      const wrapper = shallow(<BandView {...props} />);
      const name = wrapper.find('[data-id="name"]');

      expect(name.prop('children')).toEqual('Band Name');
    });

    it('does not render', () => {
      props.band.name = null;
      const wrapper = shallow(<BandView {...props} />);

      expect(wrapper.find('[data-id="name"]').length).toEqual(0);
    });
  });

  describe('description', () => {
    it('renders based on description', () => {
      const wrapper = shallow(<BandView {...props} />);
      const name = wrapper.find('[data-id="description"]');

      expect(name.prop('children')).toEqual('Band Description');
    });

    it('does not render', () => {
      props.band.description = null;
      const wrapper = shallow(<BandView {...props} />);

      expect(wrapper.find('[data-id="description"]').length).toEqual(0);
    });
  });
});
