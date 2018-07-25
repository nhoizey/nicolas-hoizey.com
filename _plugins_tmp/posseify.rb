# https://developer.twitter.com/en/docs/basics/counting-characters.html
# https://help.twitter.com/en/using-twitter/how-to-tweet-a-link
# require 'nokogiri'

# module Jekyll
#   module MarkdownToTweetFilter

#     def markdown_to_twitter(markdown)
#       return markdown if markdown.nil?

#       tweet = markdown

#       # replace \n
#       tweet.gsub!(/(\n)/, "\u000a")

#       # replace <del>blah blah</del> by b̶̶l̶a̶h̶ ̶b̶l̶a̶h̶
#       tweet.gsub!(/<del>([^<]+)<\/del>/) { |del| del.gsub(/<\/?del>/, '').chars.map{|c| "#{c}\u0336"}.join }

#       # mentions
#       tweet.gsub!(/\[@?([^@\]]+)\]\(https:\/\/twitter\.com\/\1\/?\)/, "@\\1")
#       tweet.gsub!(/\[Twitter\]\(https:\/\/twitter\.com\/([^)\/]+)\/?\)/, "@\\1")
#       tweet.gsub!(/\[([^\]]+)\]\(https:\/\/twitter\.com\/([^)\/]+)\/?\)/, "@\\2 (\\1)")

#       # links
#       tweet.gsub!(/\[([^\]]+)\]\(([^)]+)\)/, "\\1 (\\2)")

#       tweet
#     end
#   end
# end

# Liquid::Template.register_filter(Jekyll::MarkdownToTweetFilter)

require "jekyll/utils"
require "liquid/standardfilters"

Jekyll::Hooks.register :documents, :pre_render do |content, doc|
  # https://stackoverflow.com/a/19076283/717195
  include Liquid::StandardFilters

  # Jekyll.logger.warn("\n\n----------------------------------\n")
  # Jekyll.logger.warn(doc.page.inspect)

  settings_defaults = {
    "twitter" => {
      "max_length"         => 280,
      "url_length"         => 23,
      "min_hashtags"       => 3,
      "max_hashtags"       => 5,
      "templates"          => {
        "default" => "{{ posse_title }}\n{{ posse_content }}\n{{ posse_tags }}\n{{ posse_url }}"
      }
    },
    "mastodon" => {
      "max_length"         => 500,
      "min_hashtags"       => 3,
      "max_hashtags"       => 5,
      "templates"          => {
        "default" => "{{ posse_title }}\n\n{{ posse_content }}\n\n{{ posse_tags }}\n\n{{ posse_url }}"
      }
    }
  }

  settings = settings_defaults.deep_merge(doc.site["posseify"])

  # get content properties
  type = doc.page["collection"]
  title = doc.page["title"]
  content = doc.page["content"]
  tags = doc.page["tags"]
  url = doc.site["url"] + doc.page["url"]

  settings.each do |network, network_settings|
    message_without_meta = network_settings["templates"][type] || network_settings["templates"]["default"]
    message_without_meta.gsub!(/{{\s*posse_title\s*}}/, title)
    message_without_meta.gsub!(/{{\s*posse_content\s*}}/, content)
    message_without_meta.gsub!(/{{\s*posse_(tags|url)\s*}}/, "")

    space_left = network_settings["max_length"] - message_without_meta.length - (network_settings["url_length"] || url.length)

    hashtags = ""
    hashtags_number = 0
    tags.each do |tag|
      if hashtags_number < network_settings["max_hashtags"]
        new_hashtag = tag
        if /^[A-Za-z0-9]+$/ !~ new_hashtag
          new_hashtag = Jekyll::Utils::slugify(new_hashtag)
          Jekyll.logger.info("[slugify]", new_hashtag)
          # https://stackoverflow.com/a/39716710/717195
          # ! plante
          new_hashtag = new_hashtag.split("-").map{|e| e.capitalize}.join("".freeze)
        end
        new_hashtag += " "
        new_space_left = space_left - new_hashtag.length
        if new_space_left >= 0 || hashtags_number < network_settings["min_hashtags"]
          hashtags += new_hashtag
          space_left = space_left - new_hashtag.length
        end
      end
    end

    message_content = content
    if space_left < 0
      message_content = truncate(content, content.length + space_left, "…")
    end

    message = network_settings["templates"][type] || network_settings["templates"]["default"]
    message.gsub!(/{{\s*posse_title\s*}}/, title)
    message.gsub!(/{{\s*posse_content\s*}}/, message_content)
    message.gsub!(/{{\s*posse_tags\s*}}/, hashtags)
    message.gsub!(/{{\s*posse_url\s*}}/, url)

    doc.page[network] = message
  end
end
