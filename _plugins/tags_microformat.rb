module Jekyll
  module TagsMicroformatFilter

    def tags_microformat(html)
      return html if html.nil?

      tags = html

      tags.gsub!(/(rel="tag")/, 'rel="tag" class="p-category"')

      tags
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagsMicroformatFilter)
