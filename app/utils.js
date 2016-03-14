import moment from 'moment';

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

const utils = {
  notEqual,
  formatDate,
  sortStartTimes,
  currentIndex
};

export default Object.freeze(utils);
