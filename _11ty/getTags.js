module.exports = function (collection) {
  let tagsCollection = new Map();
  let max = 0;

  collection.getAll().forEach(function (item) {
    if ("tags" in item.data) {
      let itemTags = item.data.tags;

      // itemTags = itemTags.filter(tag => tag !== "all");

      for (const tag of itemTags) {
        let number = (tagsCollection.get(tag) || 0) + 1;
        max = Math.max(max, number);
        tagsCollection.set(tag, number);
      }
    }
  });

  // We assume there is at least one tag with only one content
  const minLog = Math.log(1);
  const maxLog = Math.log(max);

  const tags = [];
  tagsCollection.forEach((number, tag) => {
    let factor = (Math.log(number) - minLog) / (maxLog - minLog);
    tags.push({ 'tag': tag, 'number': number, 'factor': factor, 'step': Math.ceil(factor * 2) + 1 });
  });

  tags.sort((a, b) => {
    return a.tag.localeCompare(b.tag, 'en', { ignorePunctuation: true });
  })

  return tags;
};
