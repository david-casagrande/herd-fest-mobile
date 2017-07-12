import { AsyncStorage, Vibration } from 'react-native';

function vibrate() {
  Vibration.cancel();
  Vibration.vibrate();
}

function parse(value) {
  return new Promise((resolve) => {
    let schedule = [];

    if (value) {
      schedule = JSON.parse(value);
    }

    resolve(schedule);
  });
}

export function get() {
  return AsyncStorage.getItem('schedule').then((value) => parse(value));
}

export function add(id) {
  return get()
    .then((schedule) => {
      if (schedule.indexOf(id) < 0) {
        schedule.push(id);
      }

      return AsyncStorage.setItem('schedule', JSON.stringify(schedule));
    })
    .then(() => vibrate());
}

export function remove(id) {
  return get()
    .then((schedule) => {
      const idx = schedule.indexOf(id);

      if (schedule.indexOf(id) > -1) {
        schedule.splice(idx, 1);
      }

      return AsyncStorage.setItem('schedule', JSON.stringify(schedule));
    })
    .then(() => vibrate());
}
