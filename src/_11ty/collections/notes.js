const hashtagsToTags = require('../../_utils/hashtags').hashtagsToTags;
const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  notes: (collection) => {
    return getFilteredCollection(collection, 'notes').map((note) => {
      // TODO: deal with hashtags only once
      note.data.tags = [
        ...new Set(
          [].concat(
            ...note.data.tags,
            ...hashtagsToTags(note.template.frontMatter.content)
          )
        ),
      ];
      return note;
    });
  },
};
