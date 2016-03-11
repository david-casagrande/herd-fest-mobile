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
});
