import { get, cache, getCache } from '../full-schedule';
import { AsyncStorage } from 'react-native';

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn()
  }
}));

describe('full-schedule', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  describe('get', () => {
    it('calls fetch to get full schedule', () => {
      const data = {};
      const resp = { json: jest.fn(() => data) };
      global.fetch.mockImplementation(() => new Promise((resolve) => resolve(resp)));

      return get().then((fullSchedule) => {
        expect(global.fetch).toBeCalledWith('https://herd-fest-api.herokuapp.com/api/full_schedule');
        expect(fullSchedule).toEqual(data);
      });
    });
  });

  describe('cache', () => {
    it('stores data in AsyncStorage', () => {
      const data = {};
      AsyncStorage.setItem.mockImplementation(() => new Promise((resolve) => resolve(null)));

      return cache(data).then(() => {
        expect(AsyncStorage.setItem).toBeCalledWith('fullSchedule', JSON.stringify(data));
      });
    });
  });

  describe('getCache', () => {
    it('retrieves data from AsyncStorage', () => {
      const data = {};
      const resp = JSON.stringify(data);
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(resp)));

      return getCache().then((fullSchedule) => {
        expect(AsyncStorage.getItem).toBeCalledWith('fullSchedule');
        expect(fullSchedule).toEqual(data);
      });
    });

    it('retrieves data from AsyncStorage when it is not defined', () => {
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(null)));

      return getCache().then((fullSchedule) => {
        expect(AsyncStorage.getItem).toBeCalledWith('fullSchedule');
        expect(fullSchedule).toEqual(null);
      });
    });
  });
});
