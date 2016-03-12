import lookup from '../data/lookup';
import utils from '../utils';

function serializeSetTimes(schedule, collection) {
  return schedule.map((id) => {
    const setTime = lookup.getOne(collection.set_times, id);

    return {
      id: setTime.id,
      band: lookup.getOne(collection.bands, setTime.band),
      day: setTime.day,
      startTime: setTime.start_time,
      venue: lookup.getOne(collection.venues, setTime.venue)
    };
  });
}

function groupedByDay(setTimes, collection) {
  const grouped = utils.groupBy(setTimes, 'day');
  const days = Object.keys(grouped);

  return days.map((dayId) => {
    const day = lookup.getOne(collection.days, dayId);

    return {
      id: day.id,
      name: day.name,
      setTimes: grouped[dayId].sort(utils.sortStartTimes)
    };
  });
}

export default function scheduleDecorator(schedule, collection) {
  const setTimes = serializeSetTimes(schedule, collection);

  return groupedByDay(setTimes, collection).sort((l, r) => l.name > r.name);
}
