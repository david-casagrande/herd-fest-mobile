import 'react-native';
import React from 'react';
import HFSectionList from '../HFSectionList';
import { shallow } from 'enzyme';

// SectionList returns undefined when we dont mock it, try to remove this when updated react-native
// https://github.com/facebook/react-native/issues/14514
jest.mock('react-native', () => ({
  SectionList: () => false,
  StyleSheet: {},
  TouchableOpacity: () => false,
  Text: () => false,
  View: () => false
}));

describe('HFSectionList', () => {
  let props = null;

  beforeEach(() => {
    props = {
      sections: [
        {
          id: 'section-id',
          name: 'Test',
          data: [{ id: 'item-id', name: 'Test' }]
        }
      ],
      keyProp: 'id',
      renderItem: jest.fn(),
      renderSectionHeader: jest.fn(),
      onPress: jest.fn()
    };
  });

  it('renders a HFSectionList', () => {
    const wrapper = shallow(<HFSectionList {...props} />);
    const list = wrapper.find('SectionList');

    expect(list.prop('sections')).toEqual(props.sections);
  });

  it('keyExtractor based on props.keyProp', () => {
    const wrapper = shallow(<HFSectionList {...props} />);
    const list = wrapper.find('SectionList');

    expect(list.props().keyExtractor(props.sections[0].data[0])).toEqual('item-id');
  });

  describe('renderSectionHeader', () => {
    it('renders a sectionHeader with TouchableOpacity if props.onPress is defined', () => {
      props.renderSectionHeader = jest.fn(({ section }) => section.id);
      const wrapper = shallow(<HFSectionList {...props} />);
      const list = wrapper.find('SectionList');

      const sectionHeader = list.props().renderSectionHeader({ section: props.sections[0] });
      const text = sectionHeader.props.children;

      expect(text.props.children).toEqual(props.sections[0].id);

      sectionHeader.props.onPress();

      expect(props.onPress).toBeCalledWith(props.sections[0]);
    });

    it('renders a sectionHeader without TouchableOpacity if props.onPress is not defined', () => {
      props.renderSectionHeader = jest.fn(({ section }) => section.id);
      props.onPress = null;
      const wrapper = shallow(<HFSectionList {...props} />);
      const list = wrapper.find('SectionList');

      const sectionHeader = list.props().renderSectionHeader({ section: props.sections[0] });
      const text = sectionHeader.props.children;

      expect(text.props.children).toEqual(props.sections[0].id);

      expect(sectionHeader.props.onPress).not.toBeDefined();
    });

    it('tintColor', () => {
      props.tintColor = '#fff';
      props.renderSectionHeader = jest.fn(({ section }) => section.id);

      const wrapper = shallow(<HFSectionList {...props} />);
      const list = wrapper.find('SectionList');

      const sectionHeader = list.props().renderSectionHeader({ section: props.sections[0] });

      expect(sectionHeader.props.style[1].backgroundColor).toEqual(props.tintColor);
    });

    it('section.color', () => {
      props.sections[0].color = '#ccc';
      props.renderSectionHeader = jest.fn(({ section }) => section.id);

      const wrapper = shallow(<HFSectionList {...props} />);
      const list = wrapper.find('SectionList');

      const sectionHeader = list.props().renderSectionHeader({ section: props.sections[0] });

      expect(sectionHeader.props.style[1].backgroundColor).toEqual('#ccc');
    });
  });

  describe('renderItem', () => {
    it('renders an item', () => {
      props.renderItem = jest.fn(({ item }) => item.name);
      const wrapper = shallow(<HFSectionList {...props} />);
      const list = wrapper.find('SectionList');

      const item = list.props().renderItem({ item: props.sections[0].data[0] });
      const text = item.props.children;

      expect(text).toEqual(props.sections[0].data[0].name);
    });
  });

  it('separator', () => {
    const wrapper = shallow(<HFSectionList {...props} />);
    const list = wrapper.find('SectionList');
    const separator = list.props().ItemSeparatorComponent();

    expect(separator.props.style).toBeDefined();
  });
});
