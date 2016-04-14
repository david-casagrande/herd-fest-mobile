jest.unmock('../list');
jest.unmock('../../utils');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const List = require('../list').default;
const utils = require('../../utils').default;

describe('List', () => {
  const dataSource = [{ name: 'sup' }];

  it('renders a ListView with data source', () => {
    const wrapper = shallow(<List dataSource={dataSource} />);
    const listView = wrapper.children().first();
    const props = listView.props();

    expect(props.dataSource).toEqual(utils.dataSource(dataSource));
  });

  describe('row', () => {
    let rowData = null;
    let sectionId = null;
    let rowId = null;
    let wrapper = null;
    let listView = null;
    let row = null;
    let goTo = null;

    beforeEach(() => {
      rowData = dataSource[0];
      sectionId = 1;
      rowId = 1;
      goTo = jest.fn();
      wrapper = shallow(<List dataSource={dataSource} goTo={goTo} />);
      listView = wrapper.children().first();
      row = listView.props().renderRow(rowData, sectionId, rowId);
    });

    it('correctly renders a row', () => {
      expect(row.props.children.props.children.props.children).toEqual(rowData.name);
    });

    it('handles a click on the row', () => {
      row.props.onPress();

      expect(goTo).toBeCalledWith(rowData);
    });
  });

  it('renders a seperator', () => {
    const wrapper = shallow(<List dataSource={dataSource} />);
    const listView = wrapper.children().first();
    const sectionId = 1;
    const rowId = 1;
    const separator = listView.props().renderSeparator(sectionId, rowId);

    expect(separator.key).toEqual('1-1');
  });
});
