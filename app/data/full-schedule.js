import React from 'react-native';

import fetch from './fetch';

const AsyncStorage = React.AsyncStorage;

const domain = 'http://localhost:3000';
const fullScheduleURL = `${domain}/api/full_schedule`;

function get() {
  return fetch(fullScheduleURL).then((resp) => resp.json());
}

function cache(json) {
  return AsyncStorage.setItem('fullSchedule', JSON.stringify(json));
}

function getCache() {
  return AsyncStorage.getItem('fullSchedule')
    .then((value) => {
      return new Promise((resolve) => {
        let fullSchedule = null;
        if (value) {
          fullSchedule = JSON.parse(value);
        }
        resolve(fullSchedule);
      });
    });
}

const fullSchedule = {
  get,
  cache,
  getCache
};

export default Object.freeze(fullSchedule);
