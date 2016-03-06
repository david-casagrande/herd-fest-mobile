import lookup from '../data/lookup';
import utils from '../utils';

function venueSetTimes(venue, setTimes, bands) {
  return setTimes
    .filter((setTime) => venue.set_times.indexOf(setTime.id) > -1)
    .map((setTime) => {
      return { id: setTime.id, startTime: setTime.start_time, band: lookup.getOne(bands, setTime.band) }
    });
}

function dayVenues(venues, setTimes, bands) {
  return venues.map((venue) => {
    
    return {
      id: venue.id,
      name: venue.name,
      setTimes: venueSetTimes(venue, setTimes, bands).sort(utils.sortStartTimes)
    };
  });
}

export default function dayListDecorator(data, collection) {
  const venues = lookup.getMany(collection.venues, utils.uniq(data.venues));
  const setTimes = lookup.getMany(collection.set_times, data.set_times);
  const bands = lookup.getMany(collection.bands, data.bands);

  return {
    id: data.id,
    name: data.name,
    venues: dayVenues(venues, setTimes, bands).sort((l, r) => l.name > r.name)
  }
}
