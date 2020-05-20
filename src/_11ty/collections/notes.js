const hashtagsToTags = require('../../_utils/hashtags').hashtagsToTags;
const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  notes: (collection) => {
    return getFilteredCollection(collection, 'notes').map((note) => {
      let raw = note.template.frontMatter.content;
      // TODO: deal with hashtags only once
      note.data.tags = [
        ...new Set([].concat(...note.data.tags, ...hashtagsToTags(raw))),
      ];
      note.data.rawContent = raw;
      return note;
    });
  },
};
