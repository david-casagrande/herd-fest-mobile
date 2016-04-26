jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const ScheduleRow = require('../schedule-row').default;
const SectionHeader = require('../components/section-header').default;

const testUtils = require('../../test-utils');

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

describe('Schedule', () => {
  const Text = React.Text;
  const ListView = React.ListView;

  describe('loading screen', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;

    it('displays loading message', () => {
      const wrapper = shallow(<Schedule fullSchedule={fullSchedule} />);

      expect(wrapper.find(Text).prop('children')).toEqual('Loading...');
    });
  });

  describe('error screen', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;

    it('displays error message', () => {
      const wrapper = shallow(<Schedule fullSchedule={fullSchedule} />);
      wrapper.setState({ error: true });

      expect(wrapper.find(Text).prop('children')).toEqual('💩');
    });
  });

  describe('no schedule screen', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;

    it('displays no schedule message', () => {
      const wrapper = shallow(<Schedule fullSchedule={fullSchedule} />);
      wrapper.setState({ dataSource: true, schedule: [] });

      expect(wrapper.find(Text).prop('children')).toEqual('Your schedule is a blank slate.');
    });
  });

  describe('ListView', () => {
    jest.dontMock('../../data/schedule');
    const Schedule = require('../schedule').default;
    let wrapper = null;
    let dataSource = null;
    let navigator = null;

    beforeEach(() => {
      navigator = {
        push: jest.fn(),
        getCurrentRoutes: jest.fn(() => [{ index: 0 }, { index: 1 }])
      };

      wrapper = shallow(<Schedule fullSchedule={fullSchedule} navigator={navigator} />);
      dataSource = 'testData';
      wrapper.setState({ dataSource, schedule: [0] });
    });

    it('renders a ListView with dataSource set from state.dataSource', () => {
      expect(wrapper.find(ListView).first().prop('dataSource')).toEqual(dataSource);
    });

    it('renderRow returns ScheduleRow', () => {
      const rowData = { name: 'Test', day: { id: '1' } };
      const row = wrapper.find(ListView).first().props().renderRow(rowData);
      const scheduleRow = row.props.children;

      expect(scheduleRow.type === ScheduleRow).toBeTruthy();
      expect(scheduleRow.props.rowData).toEqual(rowData);
      expect(scheduleRow.props.context).toEqual(wrapper.instance());
    });

    it('renderRow returns TouchableOpacity and handles onPress ', () => {
      const rowData = { name: 'Test', day: { id: '1' }, venue: { id: 'v-1', name: 'Venue' } };
      const row = wrapper.find(ListView).first().props().renderRow(rowData);

      row.props.onPress();

      expect(navigator.push).toBeCalledWith({ name: 'Venue', index: 2, title: rowData.venue.name, id: rowData.venue.id });
    });

    it('renderSectionHeader returns SectionHeader', () => {
      const sectionData = days[0];
      const sectionHeader = wrapper.find(ListView).first().props().renderSectionHeader(sectionData);
      const expectedBackgroundColor = wrapper.state('colorMap')[sectionData.id];

      expect(sectionHeader.type === SectionHeader).toBeTruthy();
      expect(sectionHeader.props.title).toEqual(sectionData.name);
      expect(sectionHeader.props.backgroundColor).toEqual(expectedBackgroundColor);
    });

    it('renderSeparator returns Text', () => {
      const sectionId = 1;
      const rowId = 1;
      const separator = wrapper.find(ListView).first().props().renderSeparator(sectionId, rowId);

      expect(separator.key).toEqual('1-1');
    });
  });

  describe('.setSchedule', () => {
    pit('sets up data source', () => {
      const data = [setTimes[0].id, 'st-not-there'];
      const decorated = [{
        id: days[0].id,
        name: days[0].name,
        setTimes: [Object.assign({}, setTimes[0], { band: bands[0], venue: venues[0], day: [0] })]
      }];
      const dataSource = [];
      jest.setMock('../../data/schedule', {
        get: () => new Promise((resolve) => resolve(data))
      });

      jest.setMock('../../data-sources/set-times-by', jest.fn(() => []));
      // jest.setMock('../../decorators/schedule', jest.fn(() => decorated));
      // jest.setMock('../../utils', {
      //   dataSource: jest.fn(() => dataSource),
      //   colorMap: jest.fn(() => null),
      //   isAndroid: () => true
      // });

      const Schedule = require('../schedule').default;
      const dsSetTimesBy = require('../../data-sources/set-times-by');
      const utils = require('../../utils').default;

      // const scheduleDecorator = require('../../decorators/schedule');
      // const utils = require('../../utils');
      const wrapper = shallow(<Schedule fullSchedule={fullSchedule} />);

      return wrapper.instance().setSchedule().then(() => {
        const expectedSetTimes = [setTimes[0]];

        expect(dsSetTimesBy).toBeCalledWith('day', expectedSetTimes, fullSchedule);

        // expect(scheduleDecorator).toBeCalledWith([data[0]], fullSchedule);
        // expect(utils.dataSource.mock.calls[0][0]).toEqual(decorated);
        // expect(utils.dataSource.mock.calls[0][1]).toEqual({ sectionIds: [0], rowIds: [['st-1']] });
        // expect(utils.dataSource.mock.calls[0][2].getRowData([{ setTimes: [{ id: 'st-1' }] }], 0, 'st-1')).toEqual({ id: 'st-1' });
        expect(wrapper.state('schedule')).toEqual(expectedSetTimes);
      });
    });

    pit('sets state.error to true if schedule.get() fails', () => {
      jest.setMock('../../data/schedule', {
        get: () => new Promise((resolve, reject) => reject())
      });

      const Schedule = require('../schedule').default;
      const wrapper = shallow(<Schedule fullSchedule={fullSchedule} />);

      return wrapper.instance().setSchedule().catch(() => {
        expect(wrapper.state('error')).toBeTruthy();
      });
    });
  });
});
