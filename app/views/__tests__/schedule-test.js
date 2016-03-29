jest.dontMock('../../utils');
jest.dontMock('../../data/schedule');
jest.dontMock('../../decorators/schedule');

jest.dontMock('../schedule');

const testUtils = require('../../test-utils');

const fullSchedule = {
  bands: [],
  venues: [],
  set_times: [],
  days: []
}

describe('Schedule', () => {
  beforeEach(() => {

  });

  it('displays loading screen', () => {
    const component = require('../schedule').default;
    const schedule = testUtils.render(component);

    expect(schedule.output.props.children.props.children).toEqual('Loading...');
  });

  it('displays message if user doesnt have any items scheduled', () => {
    const component = require('../schedule').default;
    const schedule = testUtils.render(component, null, { dataSource: true, schedule: [] });

    expect(schedule.output.props.children.props.children).toEqual('Your schedule is a blank slate');
  });

  describe('users schedule', () => {
    let component = require('../schedule').default;
    let schedule = testUtils.render(component, { fullSchedule }, { dataSource: true, schedule: [] });

    it('creates DataSource instance', () => {
      expect(listViewDataSource.dataSourceArgs.rowHasChanged.toString()).toEqual(utils.notEqual.toString());
    });
  });
  // it('uses DataSource instance to cloneRows with dataSource from props', () => {
  //   expect(listViewDataSource.dsArgs).toEqual(dataSource);
  // });

  // it('renders a seperator', () => {
  //   const sectionId = 1;
  //   const rowId = 1;
  //   const separator = listView.props.renderSeparator(sectionId, rowId);
  //
  //   expect(separator.key).toEqual('1-1');
  // });

  // describe('row', () => {
  //   let rowData = null;
  //   let sectionId = null;
  //   let rowId = null;
  //
  //   beforeEach(() => {
  //     rowData = dataSource[0];
  //     sectionId = 1;
  //     rowId = 1;
  //   });
  //
  //   it('correctly renders a row', () => {
  //     const row = listView.props.renderRow(rowData, sectionId, rowId);
  //
  //     expect(row.props.children.props.children).toEqual(rowData.name);
  //   });
  //
  //   it('handles a click on the row', () => {
  //     const row = listView.props.renderRow(rowData, sectionId, rowId);
  //     row.props.onPress();
  //
  //     expect(goTo).toBeCalledWith(rowData);
  //   });
  // });
});
