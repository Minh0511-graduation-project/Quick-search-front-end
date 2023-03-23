function removeDuplicates(arr) {
  return Object.values(arr.reduce((acc, cur) => {
    acc[cur.value] = cur;
    return acc;
  }, {}));
}

module.exports = removeDuplicates;