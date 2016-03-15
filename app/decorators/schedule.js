import lodash from 'lodash';
import serializers from '../data/serializers';

function getSetTimes(schedule, collection) {
  return schedule.map((id) => lodash.find(collection.set_times, { id }));
}

function groupByDay(setTimes, collection) {
  const grouped = lodash.groupBy(setTimes, 'day');
  const days = lodash.keys(grouped);

  return days.map((id) => {
    const day = lodash.find(collection.days, { id });

    return {
      id: day.id,
      name: day.name,
      setTimes: serializers.setTimes(grouped[id], collection)
    };
  });
}

export default function scheduleDecorator(schedule, collection) {
  const setTimes = getSetTimes(schedule, collection);
  const groupedByDay = groupByDay(setTimes, collection);
  return lodash.sortBy(groupedByDay, ['name']);
}
