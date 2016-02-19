export function notEqual(l, r) {
  return l !== r;
}

export function groupBy(collection, key) {
  const grouped = {};

  collection.forEach((item) => {
    const itemKey = item[key];
    if(typeof grouped[itemKey] === 'undefined') { grouped[itemKey] = []; }
    grouped[itemKey].push(item);
  });

  return grouped;
}
