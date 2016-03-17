import React from 'react-native';

import moment from 'moment';

const Linking = React.Linking;

function notEqual(l, r) {
  return l !== r;
}

function formatDate(date, format = 'h:mmA') {
  const converted = moment.utc(date).format(format);
  return converted;
}

function sortStartTimes(model) {
  const amHours = 7;
  const hours = 24;
  const hour = moment.utc(model.startTime).hour();

  if (hour < amHours) {
    return hour + hours;
  }

  return hour;
}

function currentIndex(navigator) {
  const routes = navigator.getCurrentRoutes();
  return routes[routes.length - 1].index;
}

function findMany(collection, ids) {
  const lookupTable = {};
  collection.forEach((obj) => {
    lookupTable[obj.id] = obj;
  });
  return ids.map((id) => lookupTable[id]);
}

function link(url) {
  return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return new Promise((resolve, reject) => reject(supported));
    }
    return Linking.openURL(url);
  });
}

const utils = {
  notEqual,
  formatDate,
  sortStartTimes,
  currentIndex,
  findMany,
  link
};

export default Object.freeze(utils);
