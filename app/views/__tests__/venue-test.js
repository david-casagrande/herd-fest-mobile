jest.unmock('../venue');
jest.unmock('../components/set-times-by-day');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const Venue = require('../venue').default;

describe('Venue', () => {
  const SetTimesByDay = require('../components/set-times-by-day').default;

  it('renders SetTimesByDay', () => {
    const props = {
      fullSchedule: {},
      venue: { set_times: [] }
    };

    const wrapper = shallow(<Venue {...props} />);

    expect(wrapper.find(SetTimesByDay).length).toEqual(1);

    const setTimesByDay = wrapper.find(SetTimesByDay).first();

    expect(setTimesByDay.prop('setTimes')).toEqual(props.venue.set_times);
    expect(setTimesByDay.prop('fullSchedule')).toEqual(props.fullSchedule);
    expect(setTimesByDay.prop('showBand')).toEqual(true);
  });
});
