require 'nokogiri'

module Jekyll
  module MarkdownToTweetFilter

    def markdown_to_tweet(markdown)
      return markdown if markdown.nil?

      tweet = markdown

      # replace \n
      tweet.gsub!(/(\n)/, "\u000a")

      # remove bold and italics
      tweet.gsub!(/\*+([^\*\n]+)\*+/, "\\1")

      # replace <del>blah blah</del> by b̶̶l̶a̶h̶ ̶b̶l̶a̶h̶
      tweet.gsub!(/<del>([^<]+)<\/del>/) { |del| del.gsub(/<\/?del>/, '').chars.map{|c| "#{c}\u0336"}.join }

      # mentions
      # [@nhoizey](https://twitter.com/nhoizey)
      tweet.gsub!(/\[@?([^@\]]+)\]\(https:\/\/twitter\.com\/\1\/?\)/, "@\\1")

      # [Twitter](https://twitter.com/nhoizey)
      tweet.gsub!(/\[Twitter\]\(https:\/\/twitter\.com\/([^)\/]+)\/?\)/, "@\\1")

      # [Nicolas Hoizey](https://twitter.com/nhoizey)
      # tweet.gsub!(/\[([^\]]+)\]\(https:\/\/twitter\.com\/([^)\/]+)\/?\)/, "@\\2 (\\1)")
      tweet.gsub!(/\[([^\]]+)\]\(https:\/\/twitter\.com\/([^)\/]+)\/?\)/, "@\\2")

      # links
      tweet.gsub!(/\[([^\]]+)\]\(([^)]+)\)/, "\\1 (\\2 )")

      tweet
    end
  end
end

Liquid::Template.register_filter(Jekyll::MarkdownToTweetFilter)
