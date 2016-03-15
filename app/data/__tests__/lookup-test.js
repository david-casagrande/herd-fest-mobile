jest.dontMock('../lookup');

const lookup = require('../lookup').default;

describe('lookup', () => {
  const collection = [
    { id: '1', name: 'A' },
    { id: '2', name: 'B' },
    { id: '3', name: 'C' }
  ];

  describe('getMany', () => {
    it('returns an array of objects with ids matching given ids argument', () => {
      const ids = ['1', '3'];
      const results = lookup.getMany(collection, ids);

      expect(results.length).toEqual(2);
      expect(results[0]).toEqual(collection[0]);
      expect(results[1]).toEqual(collection[2]);
    });
  });
});
