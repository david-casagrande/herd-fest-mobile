function getMany(collection, ids) {
  const lookupTable = {};
  collection.forEach((item) => lookupTable[item.id] = item);
  return ids.map((id) => lookupTable[id]);
}

function getOne(collection, id) {
  return collection.find((item) => item.id === id);
}

const lookup = {
  getMany,
  getOne
};

export default Object.freeze(lookup);
