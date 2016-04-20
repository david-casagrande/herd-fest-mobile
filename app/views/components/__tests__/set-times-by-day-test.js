jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../../test-utils');

const SectionHeader = require('../section-header').default;
const SetTimeRow = require('../set-time-row').default;
const SetTimesByDay = require('../set-times-by-day').default;

const bands = [
  testUtils.fabricate('band', { id: 'b-1' }),
  testUtils.fabricate('band', { id: 'b-2' })
];

const venues = [
  testUtils.fabricate('venue', { id: 'v-1' }),
  testUtils.fabricate('venue', { id: 'v-2' })
];

const days = [
  testUtils.fabricate('day', { id: 'd-1', name: 'Friday', date: '2016-06-18' }),
  testUtils.fabricate('day', { id: 'd-2', name: 'Thursday', date: '2016-06-17' })
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
    venue: venues[1].id,
    day: days[0].id,
    start_time: '2000-01-01T19:00:00.000Z'
  }),
  testUtils.fabricate('setTime', {
    id: 'st-3',
    band: bands[0].id,
    venue: venues[1].id,
    day: days[1].id,
    start_time: '2000-01-01T18:00:00.000Z'
  })
];

const fullSchedule = {
  bands,
  days,
  venues,
  set_times: setTimes
};

describe('SetTimesByDay', () => {
  it('renders a View and Text for each day', () => {
    const utils = require('../../../utils').default;
    const lodash = require('lodash');
    const daysColorMap = utils.colorMap(lodash.sortBy(days, 'date').map((day) => day.id));

    const props = {
      setTimes: setTimes.map((setTime) => setTime.id),
      fullSchedule
    };

    const wrapper = shallow(<SetTimesByDay {...props} />);

    const day1 = wrapper.find(SectionHeader).first();
    const day2 = wrapper.find(SectionHeader).last();

    expect(day1.prop('title')).toEqual(days[1].name);
    expect(day2.prop('title')).toEqual(days[0].name);

    expect(day1.prop('backgroundColor')).toEqual(daysColorMap[days[1].id]);
    expect(day2.prop('backgroundColor')).toEqual(daysColorMap[days[0].id]);
  });

  it('renders a list of set times for each day', () => {
    const lodash = require('lodash');
    const utils = require('../../../utils').default;
    const props = {
      setTimes: setTimes.map((setTime) => setTime.id),
      fullSchedule
    };
    const wrapper = shallow(<SetTimesByDay {...props} />);

    expect(wrapper.find(SetTimeRow).length).toEqual(setTimes.length);

    const setTimeRows = wrapper.find(SetTimeRow);
    const colorMap = utils.colorMap(lodash.sortBy(days, 'date').map((day) => day.id));

    expect(setTimeRows.at(0).prop('setTime').id).toEqual(setTimes[2].id);
    expect(setTimeRows.at(1).prop('setTime').id).toEqual(setTimes[1].id);
    expect(setTimeRows.at(2).prop('setTime').id).toEqual(setTimes[0].id);

    expect(setTimeRows.at(0).prop('content')).toEqual(venues[0].name);
    expect(setTimeRows.at(1).prop('content')).toEqual(venues[0].name);
    expect(setTimeRows.at(2).prop('content')).toEqual(venues[1].name);

    expect(setTimeRows.at(0).prop('color')).toEqual(colorMap[days[1].id]);
    expect(setTimeRows.at(1).prop('color')).toEqual(colorMap[days[0].id]);
    expect(setTimeRows.at(2).prop('color')).toEqual(colorMap[days[0].id]);
  });

  it('displays band name instead of venue name if props.showBand is true', () => {
    const props = {
      setTimes: setTimes.map((setTime) => setTime.id),
      fullSchedule,
      showBand: true
    };
    const wrapper = shallow(<SetTimesByDay {...props} />);

    expect(wrapper.find(SetTimeRow).first().prop('content')).toEqual(bands[0].name);
  });
});
