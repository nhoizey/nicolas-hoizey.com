const slugify = require('../_utils/slugify');
const fs = require('fs');
const hashtagsToTags = require('../_utils/hashtags').hashtagsToTags;

module.exports = function (collection) {
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
    let tagLog = Math.log(number);
    let tagSlug = slugify(tag);

    let newTag = {
      tag: tag,
      slug: tagSlug,
      number: number,
      log: tagLog,
    };

    let tagLogoPath = `assets/logos/${tagSlug}.png`;
    if (fs.existsSync(`src/${tagLogoPath}`)) {
      newTag.logo = tagLogoPath;
    }

    let tagContentPath = `src/_includes/tags/${tagSlug}.md`;
    if (fs.existsSync(tagContentPath)) {
      newTag.description = fs.readFileSync(tagContentPath, {
        encoding: 'utf8',
      });
    }

    tags.push(newTag);
  });

  tags.sort((a, b) => {
    return a.tag.localeCompare(b.tag, 'en', { ignorePunctuation: true });
  });

  return tags;
};
