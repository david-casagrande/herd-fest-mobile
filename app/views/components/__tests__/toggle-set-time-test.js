jest.dontMock('../toggle-set-time');

const testUtils = require('../../../test-utils');
const setTime = testUtils.fabricate('setTime');

function setMock(value) {
  jest.setMock('../../../data/schedule', {
    get: jest.fn(() => new Promise((resolve) => resolve(value))),
    add: jest.fn(() => new Promise((resolve) => resolve())),
    remove: jest.fn(() => new Promise((resolve) => resolve()))
  });
}

describe('toggle-set-time', () => {
  describe('set time is not part of the users schedule', () => {
    let component = null;
    let toggleSetTime = null;
    let toggleCallback = null;

    beforeEach(() => {
      setMock(null);

      toggleCallback = jest.fn();
      component = require('../toggle-set-time').default;
      toggleSetTime = testUtils.render(component, { setTime, toggleCallback });
    });

    it('renders add set time display', () => {
      expect(toggleSetTime.output.props.children.props.children).toEqual('+');
    });

    it('adds set time to users schedule onPress', () => {
      const scheduleMock = require('../../../data/schedule');

      toggleSetTime.output.props.onPress();

      expect(scheduleMock.add).toBeCalledWith(setTime.id);
    });

    pit('handles toggleCallback', () => { // eslint-disable-line arrow-body-style
      return toggleSetTime.output.props.onPress().then(() => expect(toggleCallback).toBeCalledWith(true, setTime.id));
    });
  });

  describe('set time is part of the users schedule', () => {
    let component = null;
    let toggleSetTime = null;
    let toggleCallback = null;

    beforeEach(() => {
      setMock(null);

      toggleCallback = jest.fn();
      component = require('../toggle-set-time').default;
      toggleSetTime = testUtils.render(component, { setTime, toggleCallback }, { scheduled: true });
    });

    it('renders remove set time display', () => {
      expect(toggleSetTime.output.props.children.props.children).toEqual('-');
    });

    it('removes set time from users schedule onPress', () => {
      const scheduleMock = require('../../../data/schedule');

      toggleSetTime.output.props.onPress();

      expect(scheduleMock.remove).toBeCalledWith(setTime.id);
    });

    pit('handles toggleCallback', () => { // eslint-disable-line arrow-body-style
      return toggleSetTime.output.props.onPress().then(() => expect(toggleCallback).toBeCalledWith(false, setTime.id));
    });
  });

  describe('not given a toggleCallback', () => {
    let component = null;
    let toggleSetTime = null;

    beforeEach(() => {
      setMock(null);

      component = require('../toggle-set-time').default;
      toggleSetTime = testUtils.render(component, { setTime });
    });

    pit('doesnt fail', () => { // eslint-disable-line arrow-body-style
      return toggleSetTime.output.props.onPress().then(() => expect(true).toEqual(true));
    });
  });
});
