jest.unmock('../schedule-row');
jest.unmock('../components/toggle-set-time');
jest.unmock('../../utils');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../test-utils');

const ScheduleRow = require('../schedule-row').default;
const ToggleSetTime = require('../components/toggle-set-time').default;
const utils = require('../../utils').default;

describe('ScheduleRow', () => {
  const Animated = React.Animated;
  const Text = React.Text;

  let props = null;

  beforeEach(() => {
    props = {
      rowData: {
        startTime: '2000-01-01T20:40:00.000Z',
        band: testUtils.fabricate('band'),
        venue: testUtils.fabricate('venue')
      },
      context: {
        setSchedule: jest.fn()
      }
    };
  });

  it('sets initial state.heightAnim', () => {
    const wrapper = shallow(<ScheduleRow {...props} />);
    const initHeight = ScheduleRow.initHeight;

    expect(Animated.Value).toBeCalledWith(initHeight);
    expect(wrapper.state().heightAnim).toEqual(new Animated.Value(initHeight));
  });

  it('renders start time', () => {
    const wrapper = shallow(<ScheduleRow {...props} />);

    expect(wrapper.find(Text).first().props().children).toEqual(utils.formatDate(props.rowData.startTime));
  });

  it('renders venue name', () => {
    const wrapper = shallow(<ScheduleRow {...props} />);

    expect(wrapper.find(Text).at(1).props().children).toEqual(props.rowData.venue.name);
  });

  it('renders band name', () => {
    const wrapper = shallow(<ScheduleRow {...props} />);

    expect(wrapper.find(Text).last().props().children).toEqual(props.rowData.band.name);
  });

  describe('ToggleSetTime', () => {
    it('renders ToggleSetTime', () => {
      const wrapper = shallow(<ScheduleRow {...props} />);

      expect(wrapper.contains(ToggleSetTime)).toBeTruthy();

      const toggleSetTime = wrapper.find(ToggleSetTime);

      expect(toggleSetTime.prop('setTime')).toEqual(props.rowData);
    });

    it('handles toggleCallback', () => {
      const wrapper = shallow(<ScheduleRow {...props} />);
      const toggleSetTime = wrapper.find(ToggleSetTime);

      toggleSetTime.props().toggleCallback();

      expect(Animated.timing).toBeCalledWith(wrapper.state().heightAnim, { toValue: 0, duration: ScheduleRow.duration });
      expect(props.context.setSchedule).toBeCalled();
    });
  });
});
