module.exports = function (collection) {
  let tagSet = new Set();
  collection.getAll().forEach(function (item) {
    if ("tags" in item.data) {
      let tags = item.data.tags;

      tags = tags.filter(item => item !== "all");

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  // TODO: sort
  return [...tagSet];
};
