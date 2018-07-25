module Jekyll
  class TweetContent < Generator
    def generate(site)
      site.posts.docs.each do |post|
        post.data['tweet'] = [site, post.data['title'], post.content, post.data['tags'], post.url]
      end
      site.documents.each do |document|
        if document.data['layout'] == 'note'
          document.data['title'] = ''
        end
        document.data['tweet'] = content_to_tweet(site, document.data['title'], document.content, document.data['tags'], document.url)
      end
    end

  end

end
