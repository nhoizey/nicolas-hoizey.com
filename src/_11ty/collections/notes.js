const hashtagsToTags = require('../../_utils/hashtags').hashtagsToTags;
const getFilteredCollection = require('../../_utils/filter-collection');

module.exports = {
  notes: (collection) => {
    return getFilteredCollection(collection, 'notes').map((note) => {
      // TODO: deal with hashtags only once
      let tags = hashtagsToTags(note.template.frontMatter.content);
      if (note.data.tags) {
        tags = [...new Set([].concat(...note.data.tags, ...tags))];
      }
      tags.sort((a, b) => {
        return a.localeCompare(b, 'en', { ignorePunctuation: true });
      });
      // if (note.url === '/notes/2020/11/18/3/') {
      //   console.dir({ url: note.url, tags: tags });
      // }
      note.data.tags = tags;
      return note;
    });
  },
};
