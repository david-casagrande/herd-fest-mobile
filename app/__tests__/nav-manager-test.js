jest.disableAutomock();

const React = require('react-native');
const shallow = require('enzyme/shallow');

const testUtils = require('../test-utils');

const NavManager = require('../nav-manager').default;
const DataError = require('../views/data-error').default;

describe('NavManager', () => {
  let navigator = null;
  const fullSchedule = {};

  beforeEach(() => {
    navigator = {
      getCurrentRoutes: jest.fn(() => [{ index: 0 }, { index: 1 }]),
      push: jest.fn()
    };
  });

  describe('Home', () => {
    const Home = require('../views/home').default;

    it('renders Home View with correct props', () => {
      const route = { name: 'Home' };
      const props = {
        fullSchedule,
        navigator,
        route
      };

      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(Home).length).toEqual(1);

      const home = wrapper.find(Home).first();

      expect(home.props().navigator).toEqual(navigator);
    });
  });

  describe('Day', () => {
    const DayList = require('../views/day-list').default;

    it('renders Day View with correct props', () => {
      const fullScheduleWithDays = Object.assign({ days: [{ id: 'd-1' }] }, fullSchedule);
      const route = { name: 'Day', id: 'd-1' };
      const props = {
        fullSchedule: fullScheduleWithDays,
        navigator,
        route
      };

      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(DayList).length).toEqual(1);

      const day = wrapper.find(DayList).first();

      expect(day.props().navigator).toEqual(navigator);
      expect(day.props().day).toEqual(fullScheduleWithDays.days[0]);
      expect(day.props().fullSchedule).toEqual(fullScheduleWithDays);
    });
  });

  describe('Band', () => {
    const Band = require('../views/band').default;

    it('renders Band View', () => {
      const fullScheduleWithBands = Object.assign({ bands: [{ id: 'b-1' }] }, fullSchedule);
      const route = { name: 'Band', id: 'b-1' };
      const props = {
        fullSchedule: fullScheduleWithBands,
        navigator,
        route
      };

      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(Band).length).toEqual(1);

      const band = wrapper.find(Band).first();

      expect(band.props().navigator).toEqual(navigator);
      expect(band.props().band).toEqual(fullScheduleWithBands.bands[0]);
      expect(band.props().fullSchedule).toEqual(fullScheduleWithBands);
    });
  });

  describe('Venue', () => {
    const Venue = require('../views/venue').default;

    it('renders Venue View', () => {
      const fullScheduleWithVenues = Object.assign({ venues: [{ id: 'v-1' }] }, fullSchedule);
      const route = { name: 'Venue', id: 'v-1' };
      const props = {
        fullSchedule: fullScheduleWithVenues,
        navigator,
        route
      };

      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(Venue).length).toEqual(1);

      const venue = wrapper.find(Venue).first();

      expect(venue.props().navigator).toEqual(navigator);
      expect(venue.props().venue).toEqual(fullScheduleWithVenues.venues[0]);
      expect(venue.props().fullSchedule).toEqual(fullScheduleWithVenues);
    });
  });

  describe('My Schedule', () => {
    const Schedule = require('../views/schedule').default;

    let route = null;
    let props = null;

    beforeEach(() => {
      route = { name: 'My Schedule' };
      props = {
        fullSchedule: { set_times: [testUtils.fabricate('setTime')] },
        navigator,
        route
      };
    });

    it('renders DataError View if props.fullSchedule.set_times is empty', () => {
      props.fullSchedule = { set_times: [] };

      const wrapper = shallow(<NavManager {...props} />);
      expect(wrapper.is(DataError)).toBeTruthy();
    });

    it('renders Schedule View', () => {
      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(Schedule).length).toEqual(1);

      const schedule = wrapper.find(Schedule);

      expect(schedule.props().navigator).toEqual(navigator);
      expect(schedule.props().fullSchedule).toEqual(props.fullSchedule);
    });
  });

  describe('Bands', () => {
    const List = require('../views/list').default;
    const route = { name: 'Bands' };
    const bands = [
      { name: 'band 2' },
      { name: 'band 1' }
    ];
    const fullScheduleWithBands = Object.assign({ bands }, fullSchedule);

    let props = null;

    beforeEach(() => {
      props = { fullSchedule: fullScheduleWithBands, navigator, route };
    });

    it('renders DataError View if props.fullSchedule.bands is empty', () => {
      props.fullSchedule = { bands: [] };

      const wrapper = shallow(<NavManager {...props} />);
      expect(wrapper.is(DataError)).toBeTruthy();
    });

    it('renders a List view', () => {
      const wrapper = shallow(<NavManager {...props}/>);
      expect(wrapper.find(List).length).toEqual(1);
    });

    it('sorts bands by name for dataSource', () => {
      const wrapper = shallow(<NavManager {...props} />);
      const list = wrapper.find(List).first();

      expect(list.props().dataSource[0]).toEqual(bands[1]);
      expect(list.props().dataSource[1]).toEqual(bands[0]);
    });

    it('handles goTo from list view', () => {
      const wrapper = shallow(<NavManager {...props}/>);
      const list = wrapper.find(List).first();

      const model = { id: 'b-1', name: 'Band 1' };

      list.props().goTo(model);

      expect(navigator.push.mock.calls.length).toEqual(1);
      expect(navigator.push.mock.calls[0][0]).toEqual({ name: 'Band', index: 2, id: model.id, title: model.name });
    });
  });

  describe('Venues', () => {
    const List = require('../views/list').default;
    const route = { name: 'Venues' };
    const venues = [
      { name: 'venue 2' },
      { name: 'venue 1' }
    ];
    const fullScheduleWithVenues = Object.assign({ venues }, fullSchedule);

    let props = null;

    beforeEach(() => {
      props = { fullSchedule: fullScheduleWithVenues, navigator, route };
    });

    it('renders DataError View if props.fullSchedule.venues is empty', () => {
      props.fullSchedule = { venues: [] };

      const wrapper = shallow(<NavManager {...props} />);
      expect(wrapper.is(DataError)).toBeTruthy();
    });

    it('renders List View', () => {
      const wrapper = shallow(<NavManager {...props} />);
      expect(wrapper.find(List).length).toEqual(1);
    });

    it('sorts venues by name for dataSource', () => {
      const wrapper = shallow(<NavManager {...props} />);
      const list = wrapper.find(List).first();

      expect(list.props().dataSource[0]).toEqual(venues[1]);
      expect(list.props().dataSource[1]).toEqual(venues[0]);
    });

    it('handles goTo from list view', () => {
      const wrapper = shallow(<NavManager {...props}/>);
      const list = wrapper.find(List).first();

      const model = { id: 'b-1', name: 'Band 1' };

      list.props().goTo(model);

      expect(navigator.push.mock.calls.length).toEqual(1);
      expect(navigator.push.mock.calls[0][0]).toEqual({ name: 'Venue', index: 2, id: model.id, title: model.name });
    });
  });

  describe('Schedule', () => {
    const Day = require('../views/days').default;

    let fullScheduleWithDays = null;
    let route = null;
    let props = null;

    beforeEach(() => {
      fullScheduleWithDays = Object.assign({ days: [{ id: 'd-1' }] }, fullSchedule);
      route = { name: 'Schedule' };
      props = {
        fullSchedule: fullScheduleWithDays,
        navigator,
        route
      };
    });

    it('renders DataError View if props.fullSchedule.days is empty', () => {
      props.fullSchedule = { days: [] };

      const wrapper = shallow(<NavManager {...props} />);
      expect(wrapper.is(DataError)).toBeTruthy();
    });

    it('renders Day with correct props', () => {
      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(Day).length).toEqual(1);

      const day = wrapper.find(Day).first();

      expect(day.props().navigator).toEqual(navigator);
      expect(day.props().fullSchedule).toEqual(fullScheduleWithDays);
    });
  });
});
