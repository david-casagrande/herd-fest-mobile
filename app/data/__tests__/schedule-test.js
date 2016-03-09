jest.setMock('react-native', {
  AsyncStorage: {
    getItem: function(key) {
      return new Promise(function(resolve) {
        resolve([]);
      });
    }
  }
});

jest.dontMock('../schedule');

const schedule = require('../schedule').default;

describe('schedule', function() {
  describe('get', function() {
    pit('returns empty array', function() {
      // console.log(schedule.get);
      return schedule.get().then(function(v) {
        console.log('kkfdfdsafd');
        return expect(true).toEqual(true);
      });
    });
  });
});
