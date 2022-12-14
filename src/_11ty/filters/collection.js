module.exports = {
  hasAllTags: (collection, currentItemUrl, ...tags) => {
    return collection.filter((item) => {
      if (item.data.page.url === currentItemUrl) {
        return false;
      }
      const commonTags = tags.filter((tag) => item.data.tags.includes(tag));
      return tags.length === commonTags.length;
    });
  },
  hasSomeTags: (collection, currentItemUrl, number, ...tags) => {
    if (tags.length === 1 && typeof tags[0] === 'object') {
      tags = tags[0];
    }
    return collection.filter((item) => {
      if (item.data.page.url === currentItemUrl) {
        return false;
      }
      const commonTags = tags.filter((tag) => item.data.tags.includes(tag));
      return commonTags.length >= number;
    });
  },
};
