import lodash from 'lodash';
import lookup from '../data/lookup';
import serializers from '../data/serializers';

function getSetTimes(setTimes, collection) {
  return setTimes.map((id) => lookup.getOne(collection.set_times, id));
}

function groupedByVenue(setTimes, collection) {
  const grouped = lodash.groupBy(setTimes, 'venue');
  const venues = Object.keys(grouped);

  return venues.map((venueId) => {
    const venue = lookup.getOne(collection.venues, venueId);

    return {
      id: venue.id,
      name: venue.name,
      setTimes: serializers.setTimes(grouped[venueId], collection)
    };
  });
}

export default function dayListDecorator(day, collection) {
  const setTimes = getSetTimes(day.set_times, collection);
  const venues = groupedByVenue(setTimes, collection);

  return {
    id: day.id,
    name: day.name,
    venues: lodash.sortBy(venues, ['name'])
  };
}
