jest.dontMock('../schedule');

describe('schedule', function() {
  const scheduleData = ['1', '3', '9'];

  function setMock() {
    jest.setMock('react-native', {
      AsyncStorage: {
        getItem() {
          return new Promise((resolve) => resolve(JSON.stringify(scheduleData)));
        },

        setItem(key, value) {
          return new Promise((resolve) => resolve({ key, value }));
        }
      }
    });
  }

  describe('get', function() {
    pit('returns empty array if schedule is null', function() {
      const schedule = require('../schedule').default;

      return schedule.get().then(function(v) {
        return expect(v).toEqual([]);
      });
    });

    pit('returns empty array if schedule is null', function() {
      setMock();
      const schedule = require('../schedule').default;

      return schedule.get().then(function(v) {
        return expect(v).toEqual(scheduleData);
      });
    });
  });

  describe('add', function() {
    pit('adds item to schedule if it doesn\'t already exist', function() {
      const schedule = require('../schedule').default;
      const id = '10';

      return schedule.add(id).then(function(sentValues) {
        const expected = JSON.stringify(scheduleData.concat([id]));

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });

    pit('does not add item to schedule if it already exist', function() {
      const schedule = require('../schedule').default;
      const id = scheduleData[0];

      return schedule.add(id).then(function(sentValues) {
        const expected = JSON.stringify(scheduleData);

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });
  });

  describe('remove', function() {
    pit('removes item to schedule if it exists', function() {
      const schedule = require('../schedule').default;
      const id = scheduleData[0];

      return schedule.remove(id).then(function(sentValues) {
        const expected = JSON.stringify(scheduleData.slice(1, scheduleData.length));

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });

    pit('does not remove item if it exists', function() {
      const schedule = require('../schedule').default;
      const id = '10';

      return schedule.remove(id).then(function(sentValues) {
        const expected = JSON.stringify(scheduleData);

        return expect(sentValues).toEqual({ key: 'schedule', value: expected });
      });
    });
  });
});
