import { Linking, Platform } from 'react-native';
import colors from './styles/_colors';
import moment from 'moment';
import serializers from './data/serializers';
import { groupBy, sortBy, find } from 'lodash';

export function formatDate(date, format = 'h:mmA') {
  const converted = moment.utc(date).format(format);
  return converted;
}

export function sortStartTimes(model) {
  const amHours = 7;
  const hours = 24;
  const time = moment.utc(model.start_time);

  if (time.hour() < amHours) {
    time.add(hours, 'hours');
  }

  return time;
}

export function sortSetTimesByDays(model) {
  return model.day.date;
}

export function findMany(collection, ids) {
  const lookupTable = {};
  collection.forEach((obj) => {
    lookupTable[obj.id] = obj;
  });
  return ids.map((id) => lookupTable[id]);
}

export function link(url) {
  return Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      return new Promise((resolve, reject) => reject(supported));
    }
    return Linking.openURL(url);
  });
}

// export function colorMap(collection) {
//   const map = {};
//   let count = 0;
//
//   collection.forEach((key) => {
//     if (typeof map[key] !== 'undefined') {
//       return;
//     }
//
//     map[key] = colors.pinWheel[count];
//     count++;
//   });
//
//   return map;
// }

export function isAndroid() {
  return Platform.OS === 'android';
}

// setTimesBy
export function setTimesBy(type, setTimes, fullSchedule) {
  function byVenue(venues) {
    return Object.keys(venues).map((id) => {
      const venue = find(fullSchedule.venues, { id });
      const venueSetTimes = venues[id];
      const serializedSetTimes = serializers.setTimes(venueSetTimes, fullSchedule);

      return {
        id: venue.id,
        name: venue.name,
        street_address: venue.street_address,
        set_times: serializedSetTimes,
        data: serializedSetTimes
      };
    });
  }

  function byDay(days) {
    return Object.keys(days).map((id) => {
      const day = find(fullSchedule.days, { id });
      const daySetTimes = days[id];
      const serializedSetTimes = serializers.setTimes(daySetTimes, fullSchedule);

      return {
        id: day.id,
        name: day.name,
        date: day.date,
        set_times: serializedSetTimes,
        data: serializedSetTimes
      };
    });
  }

  const ByMap = {
    venue: byVenue,
    day: byDay
  };

  const SortMap = {
    venue: 'name',
    day: 'date'
  };

  const grouped = groupBy(setTimes, type);
  const parsed = ByMap[type](grouped);
  const sorted = sortBy(parsed, SortMap[type]);

  sorted.forEach((obj, idx) => {
    obj.color = colors.pinWheel[idx];
  });

  return sorted;
}

const utils = {
  formatDate,
  sortStartTimes,
  sortSetTimesByDays,
  findMany,
  link,
  // colorMap,
  isAndroid,
  setTimesBy
};

export default Object.freeze(utils);
