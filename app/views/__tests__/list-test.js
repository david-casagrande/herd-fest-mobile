jest.dontMock('../../utils');
jest.dontMock('../list');

const testUtils = require('../../test-utils');
const utils = require('../../utils').default;

describe('List', () => {
  let component = null;

  beforeEach(() => {
    component = require('../list').default;
  });

  it('creates DataSource instance', () => {
    const list = testUtils.render(component, { dataSource: [] });
    const listView = list.output.props.children;
    const listViewDataSource = listView.props.dataSource;

    expect(listViewDataSource.dataSourceArgs.rowHasChanged.toString()).toEqual(utils.notEqual.toString());
  });

  it('uses DataSource instance to cloneRows with dataSource from props', () => {
    const dataSource = [{ name: 'sup' }];
    const list = testUtils.render(component, { dataSource });
    const listView = list.output.props.children;
    const listViewDataSource = listView.props.dataSource;

    expect(listViewDataSource.dsArgs).toEqual(dataSource);
  });

  it('uses DataSource instance to cloneRows with dataSource from props', () => {
    const dataSource = [{ name: 'sup' }];
    const list = testUtils.render(component, { dataSource });
    const listView = list.output.props.children;
    const listViewDataSource = listView.props.dataSource;

    console.log(listViewDataSource.dsArgs);
    expect(listViewDataSource.dsArgs).toEqual(dataSource);
  });
});
