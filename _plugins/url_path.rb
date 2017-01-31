module UrlPathFilter
  def url_path(input)
    input.gsub(/\/[^\/]+$/, '/')
  end
end

Liquid::Template.register_filter(UrlPathFilter)
