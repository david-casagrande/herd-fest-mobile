jest.dontMock('../nav-manager');
jest.dontMock('../views/home');
jest.dontMock('../views/day-list');
jest.dontMock('../views/band');
jest.dontMock('../views/venue');
jest.dontMock('../views/list');
jest.dontMock('../utils');

const testUtils = require('../test-utils');
const NavManager = require('../nav-manager').default;

const fullSchedule = {};

describe('NavManager', () => {
  let navigator = null;

  beforeEach(() => {
    navigator = {
      getCurrentRoutes: jest.fn(() => [{ index: 0 }, { index: 1 }]),
      push: jest.fn()
    };
  });

  describe('Home', () => {
    const Home = require('../views/home').default;

    it('renders Home View', () => {
      const route = { name: 'Home' };
      const component = testUtils.render(NavManager, { fullSchedule, navigator, route });

      expect(component.output.type).toEqual(Home);
      expect(component.output.props).toEqual({ fullSchedule, navigator });
    });
  });

  describe('Day', () => {
    const DayList = require('../views/day-list').default;

    it('renders Day View', () => {
      const fullScheduleWithDays = Object.assign({ days: [{ id: 'd-1' }] }, fullSchedule);
      const route = { name: 'Day', id: 'd-1' };
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithDays, navigator, route });

      expect(component.output.type).toEqual(DayList);
      expect(component.output.props).toEqual({ fullSchedule: fullScheduleWithDays, navigator, day: fullScheduleWithDays.days[0] });
    });
  });

  describe('Band', () => {
    const Band = require('../views/band').default;

    it('renders Band View', () => {
      const fullScheduleWithBands = Object.assign({ bands: [{ id: 'b-1' }] }, fullSchedule);
      const route = { name: 'Band', id: 'b-1' };
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithBands, navigator, route });

      expect(component.output.type).toEqual(Band);
      expect(component.output.props).toEqual({ fullSchedule: fullScheduleWithBands, navigator, band: fullScheduleWithBands.bands[0] });
    });
  });

  describe('Venue', () => {
    const Venue = require('../views/venue').default;

    it('renders Venue View', () => {
      const fullScheduleWithVenues = Object.assign({ venues: [{ id: 'v-1' }] }, fullSchedule);
      const route = { name: 'Venue', id: 'v-1' };
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithVenues, navigator, route });

      expect(component.output.type).toEqual(Venue);
      expect(component.output.props).toEqual({ fullSchedule: fullScheduleWithVenues, navigator, venue: fullScheduleWithVenues.venues[0] });
    });
  });

  describe('Schedule', () => {
    const Schedule = require('../views/schedule').default;

    it('renders Schedule View', () => {
      const route = { name: 'Schedule' };
      const component = testUtils.render(NavManager, { fullSchedule, navigator, route });

      expect(component.output.type).toEqual(Schedule);
      expect(component.output.props).toEqual({ fullSchedule, navigator });
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

    it('renders Bands View', () => {
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithBands, navigator, route });
      expect(component.output.type).toEqual(List);
    });

    it('sorts bands by name for dataSource', () => {
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithBands, navigator, route });
      expect(component.output.props.dataSource[0]).toEqual(bands[1]);
      expect(component.output.props.dataSource[1]).toEqual(bands[0]);
    });

    it('handles goTo from list view', () => {
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithBands, navigator, route });
      const model = { id: 'b-1', name: 'Band 1' };

      component.output.props.goTo(model);

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

    it('renders Venues View', () => {
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithVenues, navigator, route });
      expect(component.output.type).toEqual(List);
    });

    it('sorts venues by name for dataSource', () => {
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithVenues, navigator, route });
      expect(component.output.props.dataSource[0]).toEqual(venues[1]);
      expect(component.output.props.dataSource[1]).toEqual(venues[0]);
    });

    it('handles goTo from list view', () => {
      const component = testUtils.render(NavManager, { fullSchedule: fullScheduleWithVenues, navigator, route });
      const model = { id: 'v-1', name: 'Venue 1' };

      component.output.props.goTo(model);

      expect(navigator.push.mock.calls.length).toEqual(1);
      expect(navigator.push.mock.calls[0][0]).toEqual({ name: 'Venue', index: 2, id: model.id, title: model.name });
    });
  });
});
