import lookup from '../data/lookup';
import utils from '../utils';

/* eslint  arrow-body-style: "off" */
function venueSetTimes(venue, setTimes, bands) {
  return setTimes
    .filter((setTime) => venue.set_times.indexOf(setTime.id) > -1)
    .map((setTime) => {
      return { id: setTime.id, startTime: setTime.start_time, band: lookup.getOne(bands, setTime.band) };
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

export default function dayListDecorator(day, collection) {
  const venues = lookup.getMany(collection.venues, utils.uniq(day.venues));
  const setTimes = lookup.getMany(collection.set_times, day.set_times);
  const bands = lookup.getMany(collection.bands, day.bands);

  return {
    id: day.id,
    name: day.name,
    venues: dayVenues(venues, setTimes, bands).sort((l, r) => l.name > r.name)
  };
}
