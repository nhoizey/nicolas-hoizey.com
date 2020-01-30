module Jekyll
  module Algolia
    module Hooks
      def self.before_indexing_each(record, node, context)
        record[:comments] = nil
        record[:raw_content] = nil
        record
      end
    end
  end
end
