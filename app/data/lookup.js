function getMany(collection, ids) {
  const lookupTable = {};
  collection.forEach((obj) => {
    lookupTable[obj.id] = obj;
  });
  return ids.map((id) => lookupTable[id]);
}

const lookup = {
  getMany
};

export default Object.freeze(lookup);
