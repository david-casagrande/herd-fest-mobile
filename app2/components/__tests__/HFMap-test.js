import React from 'react';
import { shallow } from 'enzyme';
import HFMap from '../HFMap';
import { link } from '../../utils';

jest.mock('../../utils');

describe('HFMap', () => {
  let props = null;

  beforeEach(() => {
    link.mockReset();

    props = {
      address: '555 Fake Street'
    };
  });

  describe('label', () => {
    it('default', () => {
      const wrapper = shallow(<HFMap {...props} />);
      const text = wrapper.find('Text');

      expect(text.prop('children')).toEqual('Map');
    });

    it('from props', () => {
      props.label = 'Test'
      const wrapper = shallow(<HFMap {...props} />);
      const text = wrapper.find('Text');

      expect(text.prop('children')).toEqual('Test');
    });
  });

  describe('onPress', () => {
    it('tries google maps app first', () => {
      link.mockImplementation(() => new Promise((resolve) => resolve()));
      const wrapper = shallow(<HFMap {...props} />);

      wrapper.simulate('press');

      expect(link).toBeCalledWith('comgooglemaps://?q=555 Fake Street, Buffalo, NY');
    });

    it('tries browser google maps if google maps app fails', () => {
      link.mockImplementation(() => new Promise((resolve, reject) => reject()));
      const wrapper = shallow(<HFMap {...props} />);

      return wrapper.props().onPress().catch(() => {
        expect(link).toBeCalledWith('comgooglemaps://?q=555 Fake Street, Buffalo, NY');
        expect(link).toBeCalledWith('https://maps.google.com/?q=555 Fake Street, Buffalo, NY');
      });
    });
  });
});
