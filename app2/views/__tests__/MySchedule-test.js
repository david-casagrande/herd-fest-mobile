import 'react-native';
import React from 'react';
import MyScheduleView from '../MySchedule';

import { shallow } from 'enzyme';

describe('MyScheduleView', () => {
  let props = null;

  beforeEach(() => {
    props = {
      sections: [],
      onNavigate: jest.fn()
    };
  });

  it('renders HFSectionList with props.sections', () => {
    const wrapper = shallow(<MyScheduleView {...props} />);
    const list = wrapper.find('HFSectionList');

    expect(list.prop('sections')).toEqual([]);
    expect(list.prop('keyProp')).toEqual('id');
  });

  it('item', () => {
    const wrapper = shallow(<MyScheduleView {...props} />);
    const list = wrapper.find('HFSectionList');

    const item = {
      band: {
        name: 'band'
      },
      venue: {
        name: 'venue'
      },
      start_time: '2000-01-01T22:45:00.000Z'
    };

    const listItem = list.props().renderItem({ item, section: { color: '#000' } });

    expect(listItem.props.tintColor).toEqual('#000');
    expect(listItem.props.setTime).toEqual(item);
    expect(listItem.props.showVenue).toEqual(true);

    listItem.props.onPress();

    expect(props.onNavigate).toBeCalledWith('Band', item.band);
  });

  it('renderSectionHeader', () => {
    const wrapper = shallow(<MyScheduleView {...props} />);
    const list = wrapper.find('HFSectionList');

    const section = {
      name: 'Section Name'
    };

    const sectionHeader = list.props().renderSectionHeader({ section });

    expect(sectionHeader).toEqual('Section Name');
  });

  it('onPress', () => {
    const wrapper = shallow(<MyScheduleView {...props} />);
    const list = wrapper.find('HFSectionList');

    list.simulate('press', {});

    expect(props.onNavigate).toBeCalledWith('Venue', {});
  });
});
