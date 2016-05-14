jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../test-utils');

const bands = [
  testUtils.fabricate('band')
];

const venues = [
  testUtils.fabricate('venue')
];

const days = [
  testUtils.fabricate('day', { date: '2016-06-19', set_times: ['st-2', 'st-1'] })
];

const setTimes = [
  testUtils.fabricate('setTime', {
    id: 'st-1',
    band: bands[0].id,
    venue: venues[0].id,
    day: days[0].id,
    start_time: '2000-01-01T20:00:00.000Z'
  }),
  testUtils.fabricate('setTime', {
    id: 'st-2',
    band: bands[0].id,
    venue: venues[0].id,
    day: days[0].id,
    start_time: '2000-01-01T01:00:00.000Z'
  }),
  testUtils.fabricate('setTime', {
    id: 'st-3',
    band: bands[0].id,
    venue: venues[0].id,
    day: 'd-2',
    start_time: '2000-01-01T00:00:00.000Z'
  })
];

const fullSchedule = {
  days,
  venues,
  bands,
  set_times: setTimes
};

describe('DayList', () => {
  describe('ListView', () => {
    let props = null;

    beforeEach(() => {
      props = {
        fullSchedule,
        day: days[0],
        navigator: {
          push: jest.fn(),
          getCurrentRoutes: jest.fn(() => [{ index: 1 }])
        },
        color: '#ccc'
      };
    });

    it('renders a ListView', () => {
      const DayList = require('../day-list').default;
      const ListView = React.ListView;

      const wrapper = shallow(<DayList {...props} />);
      expect(wrapper.find(ListView).length).toEqual(1);
    });

    describe('dataSource', () => {
      it('uses setTimeBy data source', () => {
        jest.setMock('../../data-sources/set-times-by', jest.fn(() => []));
        const DayList = require('../day-list').default;
        const dsSetTimesBy = require('../../data-sources/set-times-by');
        const utils = require('../../utils').default;

        shallow(<DayList {...props} />);
        const expectedSetTimes = utils.findMany(props.fullSchedule.set_times, props.day.set_times);

        expect(dsSetTimesBy).toBeCalledWith('venue', expectedSetTimes, props.fullSchedule);
      });

      it('sets up ListView dataSource', () => {
        const ds = ['2'];
        jest.setMock('../../data-sources/set-times-by', jest.fn(() => ds));
        const DayList = require('../day-list').default;
        const ListView = React.ListView;

        const wrapper = shallow(<DayList {...props} />);

        expect(wrapper.find(ListView).first().prop('dataSource')).toEqual(ds);
      });
    });

    describe('.renderRow', () => {
      let color = null;
      let rowData = null;

      beforeEach(() => {
        color = '#ccc';
        rowData = Object.assign({}, setTimes[0], { startTime: setTimes[0].start_time, band: bands[0] });
      });

      it('renders set time row', () => {
        const DayList = require('../day-list').default;
        const ListView = React.ListView;
        const SetTimeRow = require('../components/set-time-row').default;

        const wrapper = shallow(<DayList {...props} />);
        const row = wrapper.find(ListView).first().props().renderRow(rowData, props.navigator, color);

        expect(row.props.children.type).toEqual(SetTimeRow);
        expect(row.props.children.props.setTime).toEqual(rowData);
        expect(row.props.children.props.color).toEqual(color);
      });

      it('handles onClick', () => {
        const DayList = require('../day-list').default;
        const ListView = React.ListView;

        const wrapper = shallow(<DayList {...props} />);
        const row = wrapper.find(ListView).first().props().renderRow(rowData, props.navigator, color);

        row.props.onPress();

        expect(props.navigator.push).toBeCalledWith({ name: 'Band', index: 2, title: rowData.band.name, id: rowData.band.id });
      });
    });

    describe('.renderSectionHeader', () => {
      let sectionData = null;
      let sectionId = null;

      beforeEach(() => {
        sectionData = { id: 1, name: 'Test' };
        sectionId = 0;
      });

      it('renders SectionHeader component', () => {
        const DayList = require('../day-list').default;
        const ListView = React.ListView;
        const SectionHeader = require('../components/section-header').default;

        const wrapper = shallow(<DayList {...props} />);
        const sectionHeader = wrapper.find(ListView).first().props().renderSectionHeader(sectionData, sectionId, props.navigator);

        expect(sectionHeader.props.children.type === SectionHeader).toBeTruthy();
        expect(sectionHeader.props.children.props.title).toEqual(sectionData.name);
        expect(sectionHeader.props.children.props.backgroundColor).toEqual(props.color);
      });

      it('handles onClick', () => {
        const DayList = require('../day-list').default;
        const ListView = React.ListView;

        const wrapper = shallow(<DayList {...props} />);
        const sectionHeader = wrapper.find(ListView).first().props().renderSectionHeader(sectionData, sectionId, props.navigator);

        sectionHeader.props.onPress();

        expect(props.navigator.push).toBeCalledWith({ name: 'Venue', index: 2, title: sectionData.name, id: sectionData.id });
      });
    });

    describe('.renderSeparator', () => {
      it('renders separator view', () => {
        const DayList = require('../day-list').default;
        const ListView = React.ListView;

        const sectionId = 1;
        const rowId = 2;

        const wrapper = shallow(<DayList {...props} />);
        const separator = wrapper.find(ListView).first().props().renderSeparator(sectionId, rowId);

        expect(separator.key).toEqual(`${sectionId}-${rowId}`);
      });
    });
  });
});
