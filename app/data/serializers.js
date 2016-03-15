import lodash from 'lodash';
import utils from '../utils';

function setTime(model, collection) {
  return {
    id: model.id,
    startTime: model.start_time,
    band: lodash.find(collection.bands, { id: model.band }),
    day: lodash.find(collection.days, { id: model.day }),
    venue: lodash.find(collection.venues, { id: model.venue })
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
