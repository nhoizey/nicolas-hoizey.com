const hashtagsToTags = require('../../_utils/hashtags').hashtagsToTags;

module.exports = {
  notes: (collection) => {
    return collection
      .getFilteredByGlob('src/notes/**/*.md')
      .map((note) => {
        // TODO: deal with hashtags only once
        note.data.tags = [
          ...new Set(
            [].concat(
              ...note.data.tags,
              ...hashtagsToTags(note.template.frontMatter.content)
            )
          ),
        ];
        note.data.rawContent = note.template.frontMatter.content;
        return note;
      })
      .sort((a, b) => {
        return b.date - a.date;
      });
  },
};
