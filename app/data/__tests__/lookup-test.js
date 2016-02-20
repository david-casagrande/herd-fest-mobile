jest.dontMock('../lookup');

const lookup = require('../lookup');
const getMany = lookup.getMany;
const getOne = lookup.getOne;

describe('lookup', function() {
  const collection = [
    { id: '1', name: 'A' },
    { id: '2', name: 'B' },
    { id: '3', name: 'C' }
  ];

  describe('getMany', function() {
    it('returns an array of objects with ids matching given ids argument', function() {
      const ids = ['1', '3'];
      const results = getMany(collection, ids);

      // expect(results.length).toEqual(2);
      expect(results[0]).toEqual(collection[0]);
      expect(results[1]).toEqual(collection[2]);
    });
  });

  describe('getMany', function() {
    it('returns an object from match in collection', function() {
      const id = '2';
      const result = getOne(collection, id);

      expect(result).toEqual(collection[1]);
    });
  });
});
