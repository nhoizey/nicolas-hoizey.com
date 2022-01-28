const slugify = require('../_utils/slugify');
const hashtagsToTags = require('../_utils/hashtags').hashtagsToTags;

module.exports = function (collection) {
  const minContentsNumber = 10;
  let tagsCollection = new Map();

  collection.getAll().forEach(function (item) {
    if ('tags' in item.data) {
      let itemTags = item.data.tags;

      // TODO: deal with hashtags only once
      if (item.data.layout === 'note') {
        itemTags = [
          ...new Set(
            [].concat(
              ...itemTags,
              ...hashtagsToTags(item.template.frontMatter.content)
            )
          ),
        ];
      }

      for (const tag of itemTags) {
        let number = (tagsCollection.get(tag) || 0) + 1;
        tagsCollection.set(tag, number);
      }
    }
  });

  const tags = [];
  tagsCollection.forEach((number, tag) => {
    if (number >= minContentsNumber) {
      let tagLog = Math.log(number - minContentsNumber + 1);
      let tagSlug = slugify(tag);

      let newTag = {
        tag: tag,
        slug: tagSlug,
        number: number,
        log: tagLog,
      };

      tags.push(newTag);
    }
  });

  tags.sort((a, b) => {
    return a.tag.localeCompare(b.tag, 'en', { ignorePunctuation: true });
  });

  return tags;
};
