require "open-uri"
require "json"

module Jekyll

  # convert tweet url to embedding html
  class LazyTweetEmbedding
    def convert(line)
      if m = line.match(/^https?:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/([0-9]+)\/?$/)
        tweet_json = open("https://api.twitter.com/1/statuses/oembed.json?id=#{m[1]}").read
        line = JSON.parse(tweet_json, { :symbolize_names => true })[:html]
      end
      line
    end

    def embed(content)
      content.lines.collect {|line| convert(line) }.join
    end
  end

  # for markdown, extend oroginal parser's convert method
  module Converters
    class Markdown < Converter
      alias_method :parser_converter, :convert

      def convert(content)
        parser_converter(Jekyll::LazyTweetEmbedding.new.embed(content))
      end
    end
  end

  # for html, extend converter as a plugin
  class EmbeddingTweetIntoHTML < Converter
    safe true
    priority :low

    def matches(ext)
      ext =~ /^\.html$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      Jekyll::LazyTweetEmbedding.new.embed(content)
    end
  end

end
