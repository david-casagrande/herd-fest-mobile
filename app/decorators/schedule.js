import lodash from 'lodash';
import serializers from '../data/serializers';
import utils from '../utils';

function groupByDay(setTimes, collection) {
  const grouped = lodash.groupBy(setTimes, 'day');
  const days = lodash.keys(grouped);

  return days.map((id) => {
    const day = lodash.find(collection.days, { id });

    return {
      id: day.id,
      name: day.name,
      date: day.date,
      setTimes: serializers.setTimes(grouped[id], collection)
    };
  });
}

export default function scheduleDecorator(schedule, collection) {
  const setTimes = utils.findMany(collection.set_times, schedule);
  const groupedByDay = groupByDay(setTimes, collection);

  return lodash.sortBy(groupedByDay, 'date');
}
