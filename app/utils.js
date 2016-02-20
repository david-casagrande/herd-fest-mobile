import moment from 'moment';

export function notEqual(l, r) {
  return l !== r;
}

export function groupBy(collection, key) {
  const grouped = {};

  collection.forEach((item) => {
    const itemKey = item[key];
    if(typeof grouped[itemKey] === 'undefined') { grouped[itemKey] = []; }
    grouped[itemKey].push(item);
  });

  return grouped;
}

export function uniq(collection) {
  return collection.filter((item, idx) => collection.indexOf(item) ===  idx);
}

export function formatDate(date, format = 'h:mmA') {
  const converted = moment.utc(date).format(format);
  return converted;
}

export function sortStartTimes(l, r) {
  function addTime(hour) {
    if(hour < 6) { hour += 23; }
    return hour;
  }

  let lHour = moment.utc(l.startTime).hour();
  let rHour = moment.utc(r.startTime).hour();

  return addTime(lHour) > addTime(rHour);
}
