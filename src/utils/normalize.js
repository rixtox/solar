export default function normalize(entries, id = 'id') {
  return entries.reduce((result, entry) => {
    result[entry[id]] = entry;
    return result;
  }, {});
}
