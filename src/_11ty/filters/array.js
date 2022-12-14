// const sameValues = (array1, array2) =>
//   array1.length === array2.length &&
//   array1.every((element) => array2.includes(element));

module.exports = {
  size: (array) => {
    return !array ? 0 : array.length;
  },
  split: (string, separator) => {
    return string.split(separator);
  },
  limit: (array, limit) => {
    return array.slice(0, limit);
  },
  offset: (array, offset) => {
    return array.slice(offset);
  },
  uniq: (array) => {
    return [...new Set(array)];
  },
};
