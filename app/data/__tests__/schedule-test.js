jest.dontMock('../schedule');

describe('schedule', () => {
  const scheduleData = ['1', '3', '9'];

  function setMock(notSet = false) {
    jest.setMock('react-native', {
      AsyncStorage: {
        getItem() {
          const returnedValue = notSet ? null : JSON.stringify(scheduleData);
          return new Promise((resolve) => resolve(returnedValue));
        },

        setItem(key, value) {
          return new Promise((resolve) => resolve({ key, value }));
        }
      }
    });
  }

  describe('get', () => {
    pit('returns empty array if schedule is null', () => {
      setMock(true);
      const schedule = require('../schedule').default;

      return schedule.get().then((data) => expect(data).toEqual([]));
    });

    pit('returns empty array if schedule is null', () => {
      setMock();
      const schedule = require('../schedule').default;

      return schedule.get().then((data) => expect(data).toEqual(scheduleData));
    });
  });

  describe('add', () => {
    setMock();

    pit('adds item to schedule if it doesn\'t already exist', () => {
      const schedule = require('../schedule').default;
      const id = '10';

      return schedule.add(id).then((sentValues) => {
        const expected = JSON.stringify(scheduleData.concat([id]));

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });

    pit('does not add item to schedule if it already exist', () => {
      const schedule = require('../schedule').default;
      const id = scheduleData[0];

      return schedule.add(id).then((sentValues) => {
        const expected = JSON.stringify(scheduleData);

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });
  });

  describe('remove', () => {
    setMock();

    pit('removes item to schedule if it exists', () => {
      const schedule = require('../schedule').default;
      const id = scheduleData[0];

      return schedule.remove(id).then((sentValues) => {
        const expected = JSON.stringify(scheduleData.slice(1, scheduleData.length));

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });

    pit('does not remove item if it exists', () => {
      const schedule = require('../schedule').default;
      const id = '10';

      return schedule.remove(id).then((sentValues) => {
        const expected = JSON.stringify(scheduleData);

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });
  });
});
