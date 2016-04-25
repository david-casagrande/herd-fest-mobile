jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const SectionHeader = require('../components/section-header').default;
const SetTimeRow = require('../components/set-time-row').default;

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
  const ListView = React.ListView;

  describe('ListView', () => {
    let DayList = require('../day-list').default;
    let wrapper = null;
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

      wrapper = shallow(<DayList {...props} />);
    });

    it('renders a ListView', () => {
      expect(wrapper.find(ListView).length).toEqual(1);
    });

    describe('dataSource', () => {
      it('uses setTimeBy data source', () => {
        jest.setMock('../../data-sources/set-times-by', jest.fn(() => []));
        const dsSetTimesBy = require('../../data-sources/set-times-by');
        const utils = require('../../utils').default;
        const _DayList = require('../day-list').default;

        shallow(<_DayList {...props} />);

        const expectedSetTimes = utils.findMany(props.fullSchedule.set_times, props.day.set_times);
        expect(dsSetTimesBy).toBeCalledWith('venue', expectedSetTimes, props.fullSchedule);
      });

      fit('sets up ListView dataSource', () => {
        const ds = [];
        jest.setMock('../../data-sources/set-times-by', jest.fn(() => ds));
        const _DayList = require('../day-list').default;

        const _wrapper = shallow(<_DayList {...props} />);

        console.log(_wrapper.find(ListView).first().props());
        // expect(_wrapper.find(ListView).first().prop('dataSource')).toEqual(ds);
      });
    });


    describe('.renderRow', () => {
      let color = null;
      let rowData = null;
      let row = null;

      beforeEach(() => {
        color = '#ccc';
        rowData = Object.assign({}, setTimes[0], { startTime: setTimes[0].start_time, band: bands[0] });
        row = wrapper.find(ListView).first().props().renderRow(rowData, props.navigator, color);
      });

      it('renders set time row', () => {
        expect(row.props.children.type).toEqual(SetTimeRow);
        expect(row.props.children.props.setTime).toEqual(rowData);
        expect(row.props.children.props.color).toEqual(color);
      });

      it('handles onClick', () => {
        row.props.onPress();

        expect(props.navigator.push).toBeCalledWith({ name: 'Band', index: 2, title: rowData.band.name, id: rowData.band.id });
      });
    });

    describe('.renderSectionHeader', () => {
      let sectionData = null;
      let sectionId = null;
      let sectionHeader = null;

      beforeEach(() => {
        sectionData = { id: 1, name: 'Test' };
        sectionId = 0;
        sectionHeader = wrapper.find(ListView).first().props().renderSectionHeader(sectionData, sectionId, props.navigator);
      });

      it('renders SectionHeader component', () => {
        expect(sectionHeader.props.children.type === SectionHeader).toBeTruthy();
        expect(sectionHeader.props.children.props.title).toEqual(sectionData.name);
        expect(sectionHeader.props.children.props.backgroundColor).toEqual(props.color);
      });

      it('handles onClick', () => {
        sectionHeader.props.onPress();

        expect(props.navigator.push).toBeCalledWith({ name: 'Venue', index: 2, title: sectionData.name, id: sectionData.id });
      });
    });

    describe('.renderSeparator', () => {
      it('renders separator view', () => {
        const sectionId = 1;
        const rowId = 2;
        const separator = wrapper.find(ListView).first().props().renderSeparator(sectionId, rowId);

        expect(separator.key).toEqual(`${sectionId}-${rowId}`);
      });
    });

    // describe('.dataSource', () => {
    //   it('sets up data source', () => {
    //     const decorated = {
    //       id: 'd-1',
    //       name: 'Day 1',
    //       venues: [
    //         { setTimes: [{ id: 'st-1' }] }
    //       ]
    //     };
    //     const dataSource = [];
    //
    //     jest.setMock('../../decorators/day-list', jest.fn(() => decorated));
    //     jest.setMock('../../utils', {
    //       dataSource: jest.fn(() => dataSource),
    //       isAndroid: () => true
    //     });
    //
    //     const scheduleDecorator = require('../../decorators/day-list');
    //     const utils = require('../../utils');
    //
    //     DayList = require('../day-list').default;
    //     wrapper = shallow(<DayList {...props} />);
    //
    //     expect(scheduleDecorator).toBeCalledWith(props.day, props.fullSchedule);
    //     expect(utils.dataSource.mock.calls[0][0]).toEqual(decorated.venues);
    //     expect(utils.dataSource.mock.calls[0][1]).toEqual({ sectionIds: [0], rowIds: [['st-1']] });
    //     expect(utils.dataSource.mock.calls[0][2].getRowData([{ setTimes: [{ id: 'st-1' }] }], 0, 'st-1')).toEqual({ id: 'st-1' });
    //   });
    // });
  });
});
