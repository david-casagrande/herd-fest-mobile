jest.dontMock('../toggle-set-time');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../../test-utils');

function setMock(value) {
  jest.setMock('../../../data/schedule', {
    get: jest.fn(() => new Promise((resolve) => resolve(value))),
    add: jest.fn(() => new Promise((resolve) => resolve())),
    remove: jest.fn(() => new Promise((resolve) => resolve()))
  });
}

describe('ToggleSetTime', () => {
  const Text = React.Text;
  const TouchableOpacity = React.TouchableOpacity;

  let setTime = null;
  let props = null;

  beforeEach(() => {
    setTime = testUtils.fabricate('setTime');
    props = {
      setTime,
      toggleCallback: jest.fn()
    }
  });

  it('renders null if state.scheduled is undefined', () => {
    setMock(null);
    const ToggleSetTime = require('../toggle-set-time').default;
    const wrapper = shallow(<ToggleSetTime {...props} />);

    expect(wrapper.node).toEqual(null);
  });

  it('sets rotate transform on Text if state.scheduled is true', () => {
    setMock(null);
    const ToggleSetTime = require('../toggle-set-time').default;
    const wrapper = shallow(<ToggleSetTime {...props} />);

    wrapper.setState({ scheduled: true });

    const style = wrapper.children().first().props().children.props.style;
    expect(style[style.length - 1].transform).toEqual([{ rotate: '45deg' }]);
  });

  it('renders rotate transform on Text if state.scheduled is false', () => {
    setMock(null);
    const ToggleSetTime = require('../toggle-set-time').default;
    const wrapper = shallow(<ToggleSetTime {...props} />);

    wrapper.setState({ scheduled: false });

    const style = wrapper.children().first().props().children.props.style;
    expect(style[style.length - 1].transform).toEqual([{ rotate: '0deg' }]);
  });

  describe('.toggleSchedule', () => {
    pit('adds set time from schedule on press if state.scheduled is false', () => {
      setMock(null);
      const ToggleSetTime = require('../toggle-set-time').default;
      const schedule = require('../../../data/schedule');
      const wrapper = shallow(<ToggleSetTime {...props} />);

      wrapper.setState({ scheduled: false });

      return wrapper.children().first().props().onPress().then(() => {
        expect(schedule.add).toBeCalledWith(props.setTime.id);
        expect(wrapper.state('scheduled')).toBeTruthy();
        expect(props.toggleCallback).toBeCalledWith(true, props.setTime.id);
      });
    });

    pit('adds set time from schedule on press if state.scheduled is true', () => {
      setMock(null);
      const ToggleSetTime = require('../toggle-set-time').default;
      const schedule = require('../../../data/schedule');
      const wrapper = shallow(<ToggleSetTime {...props} />);

      wrapper.setState({ scheduled: true });

      return wrapper.children().first().props().onPress().then(() => {
        expect(schedule.remove).toBeCalledWith(props.setTime.id);
        expect(wrapper.state('scheduled')).toBeFalsy();
        expect(props.toggleCallback).toBeCalledWith(false, props.setTime.id);
      });
    });

    pit('does error when props.toggleCallback is not given', () => {
      setMock(null);
      const ToggleSetTime = require('../toggle-set-time').default;
      const wrapper = shallow(<ToggleSetTime fullSchedule={props.fullSchedule} setTime={props.setTime} />);

      wrapper.setState({ scheduled: true });

      return wrapper.children().first().props().onPress().then(() => {
        expect(true).toBeTruthy();
      });
    });
  });

  describe('.checkSchedule', () => {
    pit('sets state.scheduled true if props.setTime is in users schedule', () => {
      setMock([setTime.id]);
      const ToggleSetTime = require('../toggle-set-time').default;
      const wrapper = shallow(<ToggleSetTime {...props} />);

      expect(wrapper.state('scheduled')).toBeUndefined();

      return wrapper.instance().checkSchedule().then(() => {
        expect(wrapper.state('scheduled')).toBeTruthy();
      });
    });

    pit('sets state.scheduled false if props.setTime is not in users schedule', () => {
      setMock([]);
      const ToggleSetTime = require('../toggle-set-time').default;
      const wrapper = shallow(<ToggleSetTime {...props} />);

      expect(wrapper.state('scheduled')).toBeUndefined();

      return wrapper.instance().checkSchedule().then(() => {
        expect(wrapper.state('scheduled')).toBeFalsy();
      });
    });
  });
});
