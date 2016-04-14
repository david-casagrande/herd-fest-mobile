jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../../test-utils');

const SetTimesByDay = require('../set-times-by-day').default;
const ToggleSetTime = require('../toggle-set-time').default;

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
  testUtils.fabricate('setTime', { id: 'st-1', band: bands[0].id, venue: venues[0].id, day: days[0].id, start_time: '2000-01-01T20:00:00.000Z' }),
  testUtils.fabricate('setTime', { id: 'st-2', band: bands[0].id, venue: venues[1].id, day: days[0].id, start_time: '2000-01-01T19:00:00.000Z' }),
  testUtils.fabricate('setTime', { id: 'st-3', band: bands[0].id, venue: venues[1].id, day: days[1].id, start_time: '2000-01-01T18:00:00.000Z' })
];

const fullSchedule = {
  bands,
  days,
  venues,
  set_times: setTimes
};

describe('SetTimesByDay', () => {
  const View = React.View;
  const Text = React.Text;

  it('renders a View and Text for each day', () => {
    const props = {
      setTimes: setTimes.map((setTime) => setTime.id),
      fullSchedule
    };
    const wrapper = shallow(<SetTimesByDay {...props} />);

    const day1 = wrapper.childAt(0);
    const day2 = wrapper.childAt(1);

    expect(day1.childAt(0).prop('children')).toEqual(days[1].name);
    expect(day2.childAt(0).prop('children')).toEqual(days[0].name);
  });

  it('renders a list of set times for each day', () => {
    const utils = require('../../../utils').default;
    const props = {
      setTimes: setTimes.map((setTime) => setTime.id),
      fullSchedule
    };
    const wrapper = shallow(<SetTimesByDay {...props} />);

    const day1 = wrapper.childAt(0);
    const day1Text = day1.childAt(1).find(Text);

    expect(day1Text.first().prop('children')).toEqual(utils.formatDate(setTimes[2].start_time));
    expect(day1Text.last().prop('children')).toEqual(venues[1].name);
    expect(day1.contains(ToggleSetTime)).toBeTruthy();

    const day2 = wrapper.childAt(1);
    const day2Text = day2.childAt(1).find(Text);

    expect(day2Text.at(0).prop('children')).toEqual(utils.formatDate(setTimes[1].start_time));
    expect(day2Text.at(1).prop('children')).toEqual(venues[1].name);

    expect(day2Text.at(2).prop('children')).toEqual(utils.formatDate(setTimes[0].start_time));
    expect(day2Text.at(3).prop('children')).toEqual(venues[0].name);
    expect(day2.contains(ToggleSetTime)).toBeTruthy();
  });

  it('displays band name instead of venue name if props.showBand is true', () => {
    const props = {
      setTimes: setTimes.map((setTime) => setTime.id),
      fullSchedule,
      showBand: true
    };
    const wrapper = shallow(<SetTimesByDay {...props} />);

    const day1 = wrapper.childAt(0);
    const day1Text = day1.childAt(1).find(Text);

    expect(day1Text.last().prop('children')).toEqual(bands[0].name);
  });
});
