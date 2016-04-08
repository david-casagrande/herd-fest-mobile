jest.unmock('../nav-manager');
jest.unmock('../views/home');
jest.unmock('../views/day-list');
jest.unmock('../views/band');
jest.unmock('../views/venue');
jest.unmock('../views/list');
jest.unmock('../utils');

const React = require('react');
const shallow = require('enzyme/shallow');

const NavManager = require('../nav-manager').default;

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

    it('renders Schedule View', () => {
      const route = { name: 'My Schedule' };
      const props = {
        fullSchedule,
        navigator,
        route
      };

      const wrapper = shallow(<NavManager {...props} />);

      expect(wrapper.find(Schedule).length).toEqual(1);

      const schedule = wrapper.find(Schedule);

      expect(schedule.props().navigator).toEqual(navigator);
      expect(schedule.props().fullSchedule).toEqual(fullSchedule);
    });
  });

  describe('Bands', () => {
    const List = require('../views/list').default;
    const route = { name: 'Bands' };
    const  bands = [
      { name: 'band 2' },
      { name: 'band 1' }
    ];
    const fullScheduleWithBands = Object.assign({ bands }, fullSchedule);

    let props = null;

    beforeEach(() => {
      props = { fullSchedule: fullScheduleWithBands, navigator, route };
    });

    it('renders a List view', () => {
      const wrapper = shallow(<NavManager {...props}/>);
      expect(wrapper.find(List).length).toEqual(1);
    });

    xit('sorts bands by name for dataSource', () => {
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
    })

    it('renders List View', () => {
      const wrapper = shallow(<NavManager {...props} />);
      expect(wrapper.find(List).length).toEqual(1);
    });

    xit('sorts venues by name for dataSource', () => {
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
});
