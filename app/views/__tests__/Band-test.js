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
      },
      sections: []
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

  it('renders HFSectionList with props.sections', () => {
    const wrapper = shallow(<BandView {...props} />);
    const list = wrapper.find('HFSectionList');

    expect(list.prop('sections')).toEqual([]);
    expect(list.prop('keyProp')).toEqual('id');
    expect(list.prop('static')).toEqual(true);
  });

  it('HFSectionList item', () => {
    const wrapper = shallow(<BandView {...props} />);
    const list = wrapper.find('HFSectionList');

    const item = {
      venue: {
        name: 'venue'
      },
      band: {
        name: 'band'
      },
      start_time: '2000-01-01T22:45:00.000Z'
    };

    const listItem = list.props().renderItem({ item, section: { color: '#000' } });

    expect(listItem.props.setTime).toEqual(item);
    expect(listItem.props.tintColor).toEqual('#000');
    expect(listItem.props.showVenue).toEqual(true);
  });

  it('renderSectionHeader', () => {
    const wrapper = shallow(<BandView {...props} />);
    const list = wrapper.find('HFSectionList');

    const section = {
      name: 'Section Name'
    };

    const sectionHeader = list.props().renderSectionHeader({ section });

    expect(sectionHeader).toEqual('Section Name');
  });
});
