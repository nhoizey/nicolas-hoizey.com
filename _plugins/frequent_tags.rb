module FrequentTagsFilter
  def frequent_tags(input)
    # Remove tags with level 1
    # <a href="/tags/api.html" class="set-1">API</a>
    input.gsub(/<a href="[^"]+" class="set-1">[^<]+<\/a>/, '')
  end
end

Liquid::Template.register_filter(FrequentTagsFilter)
