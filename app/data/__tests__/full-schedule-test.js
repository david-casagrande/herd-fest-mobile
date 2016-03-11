jest.dontMock('../full-schedule');

function setMock(data) {
  jest.setMock('../fetch', function() {
    const resp = {
      json: function() {
        return new Promise((resolve) => resolve(data));
      }
    };
    return new Promise((resolve) => resolve(resp));
  });
}

describe('fullSchedule', function() {
  describe('get', function() {
    pit('returns parsed json data on success', function() {
      const data = { id: '1' };
      setMock(data);
      const fullSchedule = require('../full-schedule').default;

      return fullSchedule.get().then(function(v) {
        return expect(v).toEqual(data);
      });
    });
  });
});
