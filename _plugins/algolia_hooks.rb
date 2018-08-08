module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        record[:comments] = nil
        record[:raw_content] = nil
        record
      end

      # https://community.algolia.com/jekyll-algolia/hooks.html#should-be-excluded
      def self.should_be_excluded?(filepath)
        # Do not index notes index page
        return true if filepath =~ %r{notes\.html}
        false
      end
    end
  end
end
