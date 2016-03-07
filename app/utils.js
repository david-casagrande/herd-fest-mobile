import moment from 'moment';

function notEqual(l, r) {
  return l !== r;
}

function uniq(collection) {
  return collection.filter((obj, idx) => collection.indexOf(obj) === idx);
}

function groupBy(collection, key) {
  const grouped = {};

  collection.forEach((obj) => {
    const objKey = obj[key];
    if (typeof grouped[objKey] === 'undefined') {
      grouped[objKey] = [];
    }
    grouped[objKey].push(obj);
  });

  return grouped;
}

function formatDate(date, format = 'h:mmA') {
  const converted = moment.utc(date).format(format);
  return converted;
}

function sortStartTimes(l, r) {
  function addTime(hour) {
    const amHours = 7;
    const hours = 23;
    if (hour < amHours) {
      hour += hours;
    }
    return hour;
  }

  const lHour = moment.utc(l.startTime).hour();
  const rHour = moment.utc(r.startTime).hour();

  return addTime(lHour) > addTime(rHour);
}

const utils = {
  notEqual,
  groupBy,
  uniq,
  formatDate,
  sortStartTimes
};

export default Object.freeze(utils);
