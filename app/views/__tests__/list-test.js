jest.dontMock('../../utils');
jest.dontMock('../list');

const testUtils = require('../../test-utils');
const utils = require('../../utils').default;

describe('List', () => {
  const dataSource = [{ name: 'sup' }];

  let component = null;
  let list = null;
  let listView = null;
  let listViewDataSource = null;
  let goTo = null;

  beforeEach(() => {
    component = require('../list').default;
    goTo = jest.fn();
    list = testUtils.render(component, { dataSource, goTo });
    listView = list.output.props.children;
    listViewDataSource = listView.props.dataSource;
  });

  it('creates DataSource instance', () => {
    expect(listViewDataSource.dataSourceArgs.rowHasChanged.toString()).toEqual(utils.notEqual.toString());
  });

  it('uses DataSource instance to cloneRows with dataSource from props', () => {
    expect(listViewDataSource.dsArgs).toEqual(dataSource);
  });

  it('renders a seperator', () => {
    const sectionId = 1;
    const rowId = 1;
    const separator = listView.props.renderSeparator(1, 1);

    console.log(separator);
    expect(separator.key).toEqual('1-1');
  });

  describe('row', () => {
    let rowData = null;
    let sectionId = null;
    let rowId = null;

    beforeEach(() => {
      rowData = dataSource[0];
      sectionId = 1;
      rowId = 1;
    });

    it('correctly renders a row', () => {
      const row = listView.props.renderRow(rowData, sectionId, rowId);

      expect(row.props.children.props.children).toEqual(rowData.name);
    });

    it('handles a click on the row', () => {
      const row = listView.props.renderRow(rowData, sectionId, rowId);
      row.props.onPress();

      expect(goTo).toBeCalledWith(rowData);
    });
  });
});
