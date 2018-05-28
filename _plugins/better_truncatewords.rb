module Jekyll
  module BetterTruncateWordsFilter

    # Enhancement of Liquid's truncatewords filter that loses punctuation
    # https://github.com/Shopify/liquid/blob/0c802aba175aefb5cfb7e40c13c892075e70ffa5/lib/liquid/standardfilters.rb#L74-L81
    def better_truncatewords(input, words = 15, truncate_string = "…".freeze)
      return if input.nil?

      # \p{L}\p{M}* ???
      # https://stackoverflow.com/a/18089658/717195
      wordlist = input.to_s.split(/(?<=\s)/)
      words = wordlist.size
      l = words - 1
      l = 0 if l < 0
      wordlist.length > l ? wordlist[0..l].join("".freeze) + truncate_string.to_s : input
    end
  end
end

Liquid::Template.register_filter(Jekyll::BetterTruncateWordsFilter)
