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
      },
      sections: [],
      onNavigate: jest.fn()
    };
  });

  it('renders HFSectionList with props.sections', () => {
    const wrapper = shallow(<VenueView {...props} />);
    const list = wrapper.find('HFSectionList');

    expect(list.prop('sections')).toEqual([]);
    expect(list.prop('keyProp')).toEqual('id');
  });

  it('item', () => {
    const wrapper = shallow(<VenueView {...props} />);
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

    const listItem = list.props().renderItem({ item });

    expect(listItem.props.setTime).toEqual(item);

    listItem.props.onPress();

    expect(props.onNavigate).toBeCalledWith('Band', item.band);
  });

  it('renderSectionHeader', () => {
    const wrapper = shallow(<VenueView {...props} />);
    const list = wrapper.find('HFSectionList');

    const section = {
      name: 'Section Name'
    };

    const sectionHeader = list.props().renderSectionHeader({ section });

    expect(sectionHeader).toEqual('Section Name');
  });
});
