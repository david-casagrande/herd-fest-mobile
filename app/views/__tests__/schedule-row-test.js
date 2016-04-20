jest.disableAutomock();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../test-utils');

const ScheduleRow = require('../schedule-row').default;
const ToggleSetTime = require('../components/toggle-set-time').default;
const SetTimeRow = require('../components/set-time-row').default;
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
      },
      color: '#ccc'
    };
  });

  it('sets initial state.heightAnim', () => {
    const wrapper = shallow(<ScheduleRow {...props} />);
    const initHeight = ScheduleRow.initHeight;

    expect(Animated.Value).toBeCalledWith(initHeight);
    expect(wrapper.state().heightAnim).toEqual(new Animated.Value(initHeight));
  });

  describe('SetTimeRow', () => {
    it('renders SetTimeRow component', () => {
      const wrapper = shallow(<ScheduleRow {...props} />);

      expect(wrapper.contains(SetTimeRow)).toBeTruthy();

      const setTimeRow = wrapper.find(SetTimeRow).first();

      expect(setTimeRow.prop('setTime')).toEqual(props.rowData);
      expect(setTimeRow.prop('color')).toEqual(props.color);
    });

    it('displays venue and band', () => {
      const wrapper = shallow(<ScheduleRow {...props} />);

      expect(wrapper.contains(SetTimeRow)).toBeTruthy();

      const setTimeRow = wrapper.find(SetTimeRow).first();
      const text = setTimeRow.find(Text);

      expect(text.first().prop('children')).toEqual(props.rowData.venue.name);
      expect(text.last().prop('children')).toEqual(props.rowData.band.name);
    });

    it('handles toggleCallback', () => {
      const wrapper = shallow(<ScheduleRow {...props} />);
      const setTimeRow = wrapper.find(SetTimeRow).first();

      setTimeRow.props().toggleCallback();

      expect(Animated.timing).toBeCalledWith(wrapper.state().heightAnim, { toValue: 0, duration: ScheduleRow.duration });
      expect(props.context.setSchedule).toBeCalled();
    });
  });
});
