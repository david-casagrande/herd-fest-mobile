export function getMany(collection, ids) {
  const lookupTable = {};
  collection.forEach((item) => lookupTable[item.id] = item);
  return ids.map((id) => lookupTable[id]);
}

export function getOne(collection, id) {
  return collection.find((item) => item.id === id);
}
