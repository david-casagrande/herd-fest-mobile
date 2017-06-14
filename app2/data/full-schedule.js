import ReactNative from 'react-native';

// import fetch from '../shims/fetch';

const AsyncStorage = ReactNative.AsyncStorage;

// const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://herd-fest-api.herokuapp.com';
const domain = 'https://herd-fest-api.herokuapp.com';

const fullScheduleURL = `${domain}/api/full_schedule`;

function get() {
  return fetch(fullScheduleURL).then((resp) => resp.json());
}

function cache(json) {
  return AsyncStorage.setItem('fullSchedule', JSON.stringify(json));
}

function resolveCache(value) {
  return new Promise((resolve) => {
    let fullSchedule = null;
    if (value) {
      fullSchedule = JSON.parse(value);
    }
    resolve(fullSchedule);
  });
}

function getCache() {
  return AsyncStorage.getItem('fullSchedule').then((value) => resolveCache(value));
}

const fullSchedule = {
  get,
  cache,
  getCache
};

export default Object.freeze(fullSchedule);
