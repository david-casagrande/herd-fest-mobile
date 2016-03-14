import lodash from 'lodash';
import lookup from './lookup';
import utils from '../utils';

function setTime(model, collection) {
  return {
    id: model.id,
    startTime: model.start_time,
    band: lookup.getOne(collection.bands, model.band),
    day: lookup.getOne(collection.days, model.day),
    venue: lookup.getOne(collection.venues, model.venue)
  };
}

function setTimes(set, collection) {
  const serializedSetTimes = set.map((model) => setTime(model, collection));

  return lodash.sortBy(serializedSetTimes, utils.sortStartTimes);
}

const serializers = {
  setTime,
  setTimes
};

export default Object.freeze(serializers);
