import lodash from 'lodash';
import serializers from '../data/serializers';

function getSetTimes(setTimes, collection) {
  return setTimes.map((id) => lodash.find(collection.set_times, { id }));
}

function groupedByVenue(setTimes, collection) {
  const grouped = lodash.groupBy(setTimes, 'venue');
  const venues = lodash.keys(grouped);

  return venues.map((id) => {
    const venue = lodash.find(collection.venues, { id });

    return {
      id: venue.id,
      name: venue.name,
      setTimes: serializers.setTimes(grouped[id], collection)
    };
  });
}

export default function dayListDecorator(day, collection) {
  const setTimes = getSetTimes(day.set_times, collection);
  const venues = groupedByVenue(setTimes, collection);

  return {
    id: day.id,
    name: day.name,
    venues: lodash.sortBy(venues, 'name')
  };
}
