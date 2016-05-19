jest.disableAutomock();

const React = require('react-native');
const MockDate = require('mockdate');
const shallow = require('enzyme/shallow');

const testUtils = require('../../test-utils');

const Days = require('../days').default;
const DayList = require('../day-list').default;
const lodash = require('lodash');

const days = [
  testUtils.fabricate('day', { id: 'd-3', name: 'Saturday', date: '2016-06-15' }),
  testUtils.fabricate('day', { id: 'd-1', name: 'Thursday', date: '2016-06-13' }),
  testUtils.fabricate('day', { id: 'd-4', name: 'Sunday', date: '2016-06-16' }),
  testUtils.fabricate('day', { id: 'd-2', name: 'Friday', date: '2016-06-14' })
];

const fullSchedule = {
  days
};

describe('Days', () => {
  const Text = React.Text;
  const TouchableOpacity = React.TouchableOpacity;

  let props = null;
  let sortedDays = null;

  beforeEach(() => {
    props = {
      fullSchedule,
      navigator: { push: jest.fn() }
    };

    sortedDays = lodash.sortBy(days, 'date');
  });

  describe('initial day', () => {
    it('sets initial state.day', () => {
      const wrapper = shallow(<Days {...props} />);

      expect(wrapper.state('day')).toEqual(sortedDays[0]);
    });

    it('sets initial state.day when the current day is one of the fullSchedule.days.date', () => {
      MockDate.set(new Date(sortedDays[2].date));

      const wrapper = shallow(<Days {...props} />);

      expect(wrapper.state('day')).toEqual(sortedDays[2]);

      MockDate.reset();
    });
  });

  it('sets initial state.colorMap', () => {
    const wrapper = shallow(<Days {...props} />);
    const utils = require('../../utils').default;

    expect(wrapper.state('colorMap')).toEqual(utils.colorMap(sortedDays.map((day) => day.id)));
  });

  it('renders DayList', () => {
    const wrapper = shallow(<Days {...props} />);
    const expectedProps = {
      fullSchedule: props.fullSchedule,
      navigator: props.navigator,
      day: wrapper.state('day'),
      color: wrapper.state('colorMap')[wrapper.state('day').id]
    };

    expect(wrapper.find(DayList).length).toEqual(1);
    expect(wrapper.find(DayList).first().props()).toEqual(expectedProps);
  });

  describe('day navigation', () => {
    it('sorts days by date and displays their name', () => {
      const wrapper = shallow(<Days {...props} />);
      const allText = wrapper.find(Text);

      expect(allText.length).toEqual(days.length);
      expect(allText.at(0).prop('children')).toEqual(sortedDays[0].name.toUpperCase());
      expect(allText.at(1).prop('children')).toEqual(sortedDays[1].name.toUpperCase());
      expect(allText.at(2).prop('children')).toEqual(sortedDays[2].name.toUpperCase());
      expect(allText.at(3).prop('children')).toEqual(sortedDays[3].name.toUpperCase()); // eslint-disable-line no-magic-numbers
    });

    it('handles onPress', () => {
      const wrapper = shallow(<Days {...props} />);

      wrapper.find(TouchableOpacity).last().simulate('press');

      expect(wrapper.state().day).toEqual(sortedDays[3]);
    });
  });
});
