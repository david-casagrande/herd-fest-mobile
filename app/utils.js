import moment from 'moment';

function notEqual(l, r) {
  return l !== r;
}

function uniq(collection) {
  return collection.filter((item, idx) => collection.indexOf(item) ===  idx);
}

function groupBy(collection, key) {
  const grouped = {};

  collection.forEach((item) => {
    const itemKey = item[key];
    if(typeof grouped[itemKey] === 'undefined') { grouped[itemKey] = []; }
    grouped[itemKey].push(item);
  });

  return grouped;
}

function formatDate(date, format = 'h:mmA') {
  const converted = moment.utc(date).format(format);
  return converted;
}

function sortStartTimes(l, r) {
  function addTime(hour) {
    if(hour < 7) { hour += 23; }
    return hour;
  }

  let lHour = moment.utc(l.startTime).hour();
  let rHour = moment.utc(r.startTime).hour();

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
