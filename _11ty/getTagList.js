module.exports = function (collection) {
  let tagSet = new Set();
  collection.getAll().forEach(function (item) {
    if ("tags" in item.data) {
      let tags = item.data.tags;

      tags = tags.filter(function (item) {
        switch (item) {
          // this list should match the `filter` list in tags.njk
          case "all":
          case "articles":
          case "links":
            return false;
        }

        return true;
      });

      for (const tag of tags) {
        tagSet.add(tag);
      }
    }
  });

  // TODO: sort
  return [...tagSet];
};
