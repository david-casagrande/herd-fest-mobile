import { getMany, getOne } from '../data/lookup';
import { groupBy, uniq, sortStartTimes } from '../utils';

function venueSetTimes(venue, setTimes, bands) {
  return setTimes
    .filter((setTime) => venue.set_times.includes(setTime.id))
    .map((setTime) => {
      return { id: setTime.id, startTime: setTime.start_time, band: getOne(bands, setTime.band) }
    });
}

function dayVenues(venues, setTimes, bands) {
  return venues.map((venue) => {
    return {
      id: venue.id,
      name: venue.name,
      setTimes: venueSetTimes(venue, setTimes, bands).sort(sortStartTimes)
    };
  });
}

export default function dayListDecorator(data, collection) {
  const venues = getMany(collection.venues, uniq(data.venues));
  const setTimes = getMany(collection.set_times, data.set_times);
  const bands = getMany(collection.bands, data.bands);

  return {
    id: data.id,
    name: data.name,
    venues: dayVenues(venues, setTimes, bands).sort((l, r) => l.name > r.name)
  }
}
