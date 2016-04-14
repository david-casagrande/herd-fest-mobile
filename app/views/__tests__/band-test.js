jest.unmock('../../utils');
jest.unmock('../../data/serializers');
jest.unmock('../band');
jest.unmock('../components/set-times-by-day');

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../../test-utils');

const Band = require('../band').default;

const bands = [
  testUtils.fabricate('band', { image_url: 'https://image.png', set_times: ['st-1'] }),
  testUtils.fabricate('band', { description: null })
];

const venues = [
  testUtils.fabricate('venue')
];

const days = [
  testUtils.fabricate('day')
];

const setTimes = [
  testUtils.fabricate('setTime', { id: 'st-1', band: bands[0].id, venue: venues[0].id, day: days[0].id })
];

const fullSchedule = {
  set_times: setTimes,
  bands,
  venues,
  days
};

describe('Band', () => {
  const Image = React.Image;
  const Text = React.Text;
  const SetTimesByDay = require('../components/set-times-by-day').default;

  it('render an Image', () => {
    const wrapper = shallow(<Band band={bands[0]} fullSchedule={fullSchedule} />);

    expect(wrapper.contains(Image)).toBeTruthy();

    const img = wrapper.find(Image).first();

    expect(img.props().source).toEqual({ uri: bands[0].image_url });
  });

  it('renders band name', () => {
    const wrapper = shallow(<Band band={bands[0]} fullSchedule={fullSchedule} />);

    const text = wrapper.find(Text).first();
    expect(text.props().children).toEqual(bands[0].name);
  });

  it('renders band description', () => {
    const wrapper = shallow(<Band band={bands[0]} fullSchedule={fullSchedule} />);

    const text = wrapper.find(Text).last();
    expect(text.props().children).toEqual(bands[0].description);
  });

  it('doesnt renders band description if it does not exist', () => {
    const wrapper = shallow(<Band band={bands[1]} fullSchedule={fullSchedule} />);

    const text = wrapper.find(Text);
    expect(text.length).toEqual(1);
  });

  it('renders SetTimesByDay component', () => {
    const wrapper = shallow(<Band band={bands[0]} fullSchedule={fullSchedule} />);

    expect(wrapper.contains(SetTimesByDay)).toBeTruthy();

    const setTimesByDay = wrapper.find(SetTimesByDay).first();
    expect(setTimesByDay.props().fullSchedule).toEqual(fullSchedule);
    expect(setTimesByDay.props().setTimes).toEqual(bands[0].set_times);
  });
});
