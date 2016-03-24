import React from 'react-native';

import moment from 'moment';

const Linking = React.Linking;
const ListView = React.ListView;

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

function dataSource(collection, ids = {}, opts = {}) {
  const dsOpts =  Object.assign(opts, {
    rowHasChanged: notEqual,
    sectionHeaderHasChanged: notEqual
  });

  const ds = new ListView.DataSource(dsOpts);

  if(ids.rowIds && ids.sectionIds) {
    return ds.cloneWithRowsAndSections(collection, ids.sectionIds, ids.rowIds);
  }

  return ds.cloneWithRows(collection);
}

const utils = {
  notEqual,
  formatDate,
  sortStartTimes,
  currentIndex,
  findMany,
  link,
  dataSource
};

export default Object.freeze(utils);
