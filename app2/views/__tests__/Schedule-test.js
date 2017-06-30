import 'react-native';
import React from 'react';
import ScheduleView from '../Schedule';

import { shallow } from 'enzyme';

describe('ScheduleView', () => {
  let props = null;
  let context = null;

  beforeEach(() => {
    props = {
      sections: [],
      color: 'color',
      onNavigate: jest.fn()
    };

    context = { venues: [] };
  });

  it('renders HFSectionList with props.sections', () => {
    const wrapper = shallow(<ScheduleView {...props} />, { context });
    const list = wrapper.find('HFSectionList');

    expect(list.prop('sections')).toEqual([]);
    expect(list.prop('keyProp')).toEqual('id');
    expect(list.prop('tintColor')).toEqual('color');
  });

  it('item', () => {
    const wrapper = shallow(<ScheduleView {...props} />, { context });
    const list = wrapper.find('HFSectionList');

    const item = {
      band: {
        name: 'band'
      },
      start_time: '2000-01-01T22:45:00.000Z'
    };

    const listItem = list.props().renderItem({ item });

    expect(listItem.props.tintColor).toEqual('color');
    expect(listItem.props.setTime).toEqual(item);
  });

  it('renderSectionHeader', () => {
    const wrapper = shallow(<ScheduleView {...props} />, { context });
    const list = wrapper.find('HFSectionList');

    const section = {
      name: 'Section Name'
    };

    const sectionHeader = list.props().renderSectionHeader({ section });

    expect(sectionHeader).toEqual('Section Name');
  });

  it('onPress', () => {
    const wrapper = shallow(<ScheduleView {...props} />, { context });
    const list = wrapper.find('HFSectionList');

    list.simulate('press', {});

    expect(props.onNavigate).toBeCalledWith('Venue', {});
  });
});
