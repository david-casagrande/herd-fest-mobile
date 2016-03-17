jest.dontMock('../full-schedule');

function setMock(data) {
  jest.setMock('../fetch', () => {
    const resp = {
      json() {
        return new Promise((resolve) => resolve(data));
      }
    };
    return new Promise((resolve) => resolve(resp));
  });
}

describe('fullSchedule', () => {
  describe('get', () => {
    pit('returns parsed json data on success', () => {
      const data = { id: '1' };
      setMock(data);
      const fullSchedule = require('../full-schedule').default;

      return fullSchedule.get().then((json) => expect(json).toEqual(data));
    });
  });

  describe('cache', () => {
    const fullSchedule = require('../full-schedule').default;
    const React = require('react-native');

    it('sets passed value on async storage', () => {
      const data = { id: '1' }
      fullSchedule.cache(data);

      expect(React.AsyncStorage.setItem).toBeCalledWith('fullSchedule', JSON.stringify(data));
    });
  });

  describe('getCache', () => {
    describe('value is not set', () => {
      pit('returns null', () => {
        const fullSchedule = require('../full-schedule').default;

        return fullSchedule.getCache().then((data) => {
          expect(data).toEqual(null);
        });
      });
    });

    describe('value is set', () => {
      pit('returns parsed value', () => {
        const fullScheduleData = { id: '1' };

        jest.setMock('react-native', {
          AsyncStorage: {
            getItem() {
              return new Promise((resolve) => resolve(JSON.stringify(fullScheduleData)));
            }
          }
        });

        const fullSchedule = require('../full-schedule').default;

        return fullSchedule.getCache().then((data) => {
          expect(data).toEqual(fullScheduleData);
        });
      });
    });
  });
});
