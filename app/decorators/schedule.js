import lodash from 'lodash';
import lookup from '../data/lookup';
import serializers from '../data/serializers';
import utils from '../utils';

function getSetTimes(schedule, collection) {
  return schedule.map((id) => lookup.getOne(collection.set_times, id));
}

function groupByDay(setTimes, collection) {
  const grouped = utils.groupBy(setTimes, 'day');
  const days = Object.keys(grouped);

  return days.map((dayId) => {
    const day = lookup.getOne(collection.days, dayId);

    return {
      id: day.id,
      name: day.name,
      setTimes: serializers.setTimes(grouped[dayId], collection)
    };
  });
}

export default function scheduleDecorator(schedule, collection) {
  const setTimes = getSetTimes(schedule, collection);
  const groupedByDay = groupByDay(setTimes, collection);
  return lodash.sortBy(groupedByDay, ['name']);
}
