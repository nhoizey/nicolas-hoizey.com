# https://community.algolia.com/jekyll-algolia/hooks.html#should-be-excluded
module Jekyll
  module Algolia
    module Hooks
      def self.should_be_excluded?(filepath)
        # Do not index blog posts from 2015
        return true if filepath =~ %r{notes\.html}
        false
      end
    end
  end
end
