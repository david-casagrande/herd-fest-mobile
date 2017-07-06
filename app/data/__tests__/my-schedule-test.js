import { get, add, remove } from '../my-schedule';
import { AsyncStorage, Vibration } from 'react-native';
// jest.dontMock('../schedule');

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    setItem: jest.fn()
  },
  Vibration: {
    vibrate: jest.fn()
  }
}));

describe('my-schedule', () => {
  beforeEach(() => {
    Vibration.vibrate.mockReset();
  });

  describe('get', () => {
    it('returns empty array if schedule is null', () => {
      const resp = null;
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(resp)));

      return get().then((data) => {
        expect(data).toEqual([])
      });
    });

    it('returns empty array if schedule is null', () => {
      const resp = JSON.stringify(['1']);
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(resp)));

      return get().then((data) => {
        expect(data).toEqual(['1']);
      });
    });
  });

  describe('add', () => {
    it('adds item to schedule if it doesnt exist', () => {
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(null)));
      AsyncStorage.setItem.mockImplementation(() => new Promise((resolve) => resolve(null)));

      const id = '10';
      return add(id).then(() => {
        expect(AsyncStorage.setItem).toBeCalledWith('schedule', JSON.stringify([id]));
        expect(Vibration.vibrate).toBeCalled();
      });
    });

    it('does not add item if it already exists', () => {
      const id = '10';
      const resp = JSON.stringify([id]);
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(resp)));
      AsyncStorage.setItem.mockImplementation(() => new Promise((resolve) => resolve(null)));

      return add(id).then(() => {
        expect(AsyncStorage.setItem).toBeCalledWith('schedule', JSON.stringify([id]));
        expect(Vibration.vibrate).toBeCalled();
      });
    });
  });

  describe('remove', () => {
    it('removes item if it exists', () => {
      const id = '10';
      const resp = JSON.stringify([id]);
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(resp)));
      AsyncStorage.setItem.mockImplementation(() => new Promise((resolve) => resolve(null)));

      return remove(id).then(() => {
        expect(AsyncStorage.setItem).toBeCalledWith('schedule', JSON.stringify([]));
        expect(Vibration.vibrate).toBeCalled();
      });
    });

    it('does not remove item if it doesnt exist', () => {
      const id = '1';
      const resp = JSON.stringify([id]);
      AsyncStorage.getItem.mockImplementation(() => new Promise((resolve) => resolve(resp)));
      AsyncStorage.setItem.mockImplementation(() => new Promise((resolve) => resolve(null)));

      return remove('10').then(() => {
        expect(AsyncStorage.setItem).toBeCalledWith('schedule', JSON.stringify([id]));
        expect(Vibration.vibrate).toBeCalled();
      });
    });
  });
});
