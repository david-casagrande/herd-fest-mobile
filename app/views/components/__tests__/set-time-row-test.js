jest.autoMockOff();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../../test-utils');

const ToggleSetTime = require('../toggle-set-time').default;
const SetTimeRow = require('../set-time-row').default;

describe('SetTimeRow', () => {
  const Text = React.Text;

  describe('.startTime', () => {
    it('renders start time', () => {
      const utils = require('../../../utils').default;
      const setTime = testUtils.fabricate('setTime', { startTime: '2000-01-01T22:00:00.000Z' });
      const wrapper = shallow(<SetTimeRow setTime={setTime} />);

      expect(wrapper.find(Text).first().prop('children')).toEqual(utils.formatDate(setTime.startTime));
    });
  });

  describe('.yieldContent', () => {
    it('renders Text with props.content if props.content is passed', () => {
      const content = 'Test';
      const setTime = testUtils.fabricate('setTime');
      const wrapper = shallow(<SetTimeRow setTime={setTime} content={content} />);

      expect(wrapper.find(Text).last().prop('children')).toEqual(content);
    });

    it('renders props.children if passed', () => {
      const content = 'Test';
      const setTime = testUtils.fabricate('setTime');
      const wrapper = shallow(<SetTimeRow setTime={setTime} content={content}><Text>Hello</Text></SetTimeRow>);

      expect(wrapper.contains(<Text>Hello</Text>)).toBeTruthy();
    });
  });

  describe('ToggleSetTime', () => {
    it('renders start time', () => {
      const setTime = testUtils.fabricate('setTime');
      const color = '#ccc';
      const toggleCallback = jest.fn();
      const wrapper = shallow(<SetTimeRow setTime={setTime} color={color} toggleCallback={toggleCallback} />);
      const toggleSetTime = wrapper.find(ToggleSetTime).first();

      expect(toggleSetTime.prop('color')).toEqual(color);
      expect(toggleSetTime.prop('setTime')).toEqual(setTime);
      expect(toggleSetTime.prop('toggleCallback')).toEqual(toggleCallback);
    });
  });
});
