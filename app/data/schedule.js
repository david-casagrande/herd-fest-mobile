import ReactNative from 'react-native';
const AsyncStorage = ReactNative.AsyncStorage;

function parse(value) {
  return new Promise((resolve) => {
    let schedule = [];

    if (value) {
      schedule = JSON.parse(value);
    }

    resolve(schedule);
  });
}

function get() {
  return AsyncStorage.getItem('schedule').then((value) => parse(value));
}

function add(id) {
  return get()
    .then((schedule) => {
      if (schedule.indexOf(id) < 0) {
        schedule.push(id);
      }

      return AsyncStorage.setItem('schedule', JSON.stringify(schedule));
    });
}

function remove(id) {
  return get()
    .then((schedule) => {
      const idx = schedule.indexOf(id);

      if (schedule.indexOf(id) > -1) {
        schedule.splice(idx, 1);
      }

      return AsyncStorage.setItem('schedule', JSON.stringify(schedule));
    });
}

const schedule = {
  get,
  add,
  remove
};

export default Object.freeze(schedule);
