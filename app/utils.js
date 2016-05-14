import ReactNative from 'react-native';

import colors from './styles/components/colors';
import moment from 'moment';

const Linking = ReactNative.Linking;
const ListView = ReactNative.ListView;
const Platform = ReactNative.Platform;

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

function sortSetTimesByDays(model) {
  return model.day.date;
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
  const dsOpts = Object.assign(opts, {
    rowHasChanged: notEqual,
    sectionHeaderHasChanged: notEqual
  });

  const ds = new ListView.DataSource(dsOpts);

  if (ids.rowIds && ids.sectionIds) {
    return ds.cloneWithRowsAndSections(collection, ids.sectionIds, ids.rowIds);
  }

  return ds.cloneWithRows(collection);
}

function colorMap(collection) {
  const map = {};
  let count = 0;

  collection.forEach((key) => {
    if (typeof map[key] !== 'undefined') {
      return;
    }

    map[key] = colors.pinWheel[count];
    count++;
  });

  return map;
}

function isAndroid() {
  return Platform.OS === 'android';
}

const utils = {
  notEqual,
  formatDate,
  sortStartTimes,
  sortSetTimesByDays,
  currentIndex,
  findMany,
  link,
  dataSource,
  colorMap,
  isAndroid
};

export default Object.freeze(utils);
