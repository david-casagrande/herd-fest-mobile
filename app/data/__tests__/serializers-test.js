jest.dontMock('../serializers');
jest.dontMock('../lookup');

const serializers = require('../serializers').default;

const setTime = {
  id: 'st-1',
  start_time: '2000-01-01T20:00:00.000Z',
  band: 'b-1',
  day: 'd-1',
  venue: 'v-1'
};

const collection = {
  bands: [{ id: 'b-1' }],
  venues: [{ id: 'v-1' }],
  set_times: [setTime],
  days: [{ id: 'd-1' }]
};

describe('serializers', () => {
  describe('setTime', () => {
    let subject = null;

    beforeEach(() => {
      subject = serializers.setTime(setTime, collection);
    });

    it('serializes set time attrs', () => {
      expect(subject.id).toEqual(setTime.id);
      expect(subject.startTime).toEqual(setTime.start_time);
    });

    it('embeds band', () => {
      expect(subject.band.id).toEqual('b-1');
    });

    it('embeds day', () => {
      expect(subject.day.id).toEqual('d-1');
    });

    it('embeds venue', () => {
      expect(subject.venue.id).toEqual('v-1');
    });
  });
});
