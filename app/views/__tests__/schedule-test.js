jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const ScheduleRow = require('../schedule-row').default;
const testUtils = require('../../test-utils');

const fullSchedule = {
  bands: [],
  venues: [],
  set_times: [],
  days: []
};

describe('Schedule', () => {
  const Text = React.Text;
  const ListView = React.ListView;

  describe('loading screen', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;

    it('displays loading message', () => {
      const wrapper = shallow(<Schedule />);

      expect(wrapper.find(Text).prop('children')).toEqual('Loading...');
    });
  });

  describe('error screen', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;

    it('displays error message', () => {
      const wrapper = shallow(<Schedule />);
      wrapper.setState({ error: true });

      expect(wrapper.find(Text).prop('children')).toEqual('💩');
    });
  });

  describe('no schedule screen', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;

    it('displays no schedule message', () => {
      const wrapper = shallow(<Schedule />);
      wrapper.setState({ dataSource: true, schedule: [] });

      expect(wrapper.find(Text).prop('children')).toEqual('Your schedule is a blank slate.');
    });
  });

  describe('ListView', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;
    let wrapper = null;
    let dataSource = null;

    beforeEach(() => {
      wrapper = shallow(<Schedule />);
      dataSource = 'testData';
      wrapper.setState({ dataSource, schedule: [0] });
    });

    it('renders a ListView with dataSource set from state.dataSource', () => {
      expect(wrapper.find(ListView).first().prop('dataSource')).toEqual(dataSource);
    });

    it('renderRow returns ScheduleRow for', () => {
      const rowData = { name: 'Test' };
      const row = wrapper.find(ListView).first().props().renderRow(rowData);

      expect(row.type === ScheduleRow).toBeTruthy();
      expect(row.props.rowData).toEqual(rowData);
      expect(row.props.context).toEqual(wrapper.instance());
    });

    it('renderSectionHeader returns Text', () => {
      const sectionData = { name: 'Test' };
      const row = wrapper.find(ListView).first().props().renderSectionHeader(sectionData);

      expect(row.type === Text).toBeTruthy();
      expect(row.props.children).toEqual(sectionData.name);
    });

    it('renderSeparator returns Text', () => {
      const sectionData = { name: 'Test' };

      const sectionId = 1;
      const rowId = 1;
      const separator = wrapper.find(ListView).first().props().renderSeparator(sectionId, rowId);

      expect(separator.key).toEqual('1-1');
    });
  });

  describe('.setSchedule', () => {
    const bands = [testUtils.fabricate('band')];
    const venues = [testUtils.fabricate('venue')];
    const days = [testUtils.fabricate('day', { id: 'd-1', set_times: ['st-1'] })];
    const setTimes = [testUtils.fabricate('setTime', { id: 'st-1', band: bands[0].id, venue: venues[0].id, day: days[0].id })];
    const fullSchedule = {
      bands,
      venues,
      days,
      set_times: setTimes
    };

    pit('sets up data source', () => {
      const data = [setTimes[0].id];
      const decorated = [{
        id: days[0].id,
        name: days[0].name,
        setTimes: [Object.assign({}, setTimes[0], { band: bands[0], venue: venues[0], day: [0] })]
      }];
      const dataSource = [];
      jest.setMock('../../data/schedule', {
        get: () => new Promise((resolve) => resolve(data))
      });
      jest.setMock('../../decorators/schedule', jest.fn(() => decorated));
      jest.setMock('../../utils', {
        dataSource: jest.fn(() => dataSource)
      });

      const Schedule = require('../schedule').default;
      const scheduleDecorator = require('../../decorators/schedule');
      const utils = require('../../utils');
      const wrapper = shallow(<Schedule fullSchedule={fullSchedule} />);

      return wrapper.instance().setSchedule().then(() => {
        expect(scheduleDecorator).toBeCalledWith(data, fullSchedule);
        expect(utils.dataSource.mock.calls[0][0]).toEqual(decorated);
        expect(utils.dataSource.mock.calls[0][1]).toEqual({ sectionIds: [0], rowIds: [['st-1']] });
        expect(utils.dataSource.mock.calls[0][2].getRowData([{ setTimes: [{ id: 'st-1' }] }], 0, 'st-1')).toEqual({ id: 'st-1' });
        expect(wrapper.state('schedule')).toEqual(data);
      });
    });
  });
});
