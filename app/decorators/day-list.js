import lookup from '../data/lookup';
import utils from '../utils';

function serializeSetTime(setTime, bands) {
  return {
    id: setTime.id,
    startTime: setTime.start_time,
    band: lookup.getOne(bands, setTime.band)
  };
}

function venueSetTimes(venue, setTimes, bands) {
  return setTimes
    .filter((setTime) => venue.set_times.indexOf(setTime.id) > -1)
    .map((setTime) => serializeSetTime(setTime, bands));
}

function serializeVenue(venue, setTimes, bands) {
  return {
    id: venue.id,
    name: venue.name,
    setTimes: venueSetTimes(venue, setTimes, bands).sort(utils.sortStartTimes)
  };
}

function dayVenues(venues, setTimes, bands) {
  return venues.map((venue) => serializeVenue(venue, setTimes, bands));
}

function serializeDay(day, venues, setTimes, bands) {
  return {
    id: day.id,
    name: day.name,
    venues: dayVenues(venues, setTimes, bands).sort((l, r) => l.name > r.name)
  };
}

export default function dayListDecorator(day, collection) {
  const venues = lookup.getMany(collection.venues, utils.uniq(day.venues));
  const setTimes = lookup.getMany(collection.set_times, day.set_times);
  const bands = lookup.getMany(collection.bands, day.bands);

  return serializeDay(day, venues, setTimes, bands);
}
