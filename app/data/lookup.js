function getMany(collection, ids) {
  const lookupTable = {};
  collection.forEach((obj) => lookupTable[obj.id] = obj);
  return ids.map((id) => lookupTable[id]);
}

function getOne(collection, id) {
  return collection.find((obj) => obj.id === id);
}

const lookup = {
  getMany,
  getOne
};

export default Object.freeze(lookup);
