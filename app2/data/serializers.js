import { find, sortBy } from 'lodash';
import { sortStartTimes } from '../utils';

function setTime(model, collection) {
  return {
    id: model.id,
    startTime: model.start_time,
    band: find(collection.bands, { id: model.band }),
    day: find(collection.days, { id: model.day }),
    venue: find(collection.venues, { id: model.venue })
  };
}

function setTimes(set, collection) {
  const serializedSetTimes = set.map((model) => setTime(model, collection));

  return sortBy(serializedSetTimes, sortStartTimes);
}

const serializers = {
  setTime,
  setTimes
};

export default Object.freeze(serializers);
