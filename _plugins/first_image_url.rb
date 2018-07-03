require 'nokogiri'

module Jekyll
  module FirstImageUrlFilter

    def first_image_url(content)
      return content if content.nil?

      doc = Nokogiri::HTML.fragment(content.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      image = doc.at_css('img').to_h

      src = ''

      if image['srcset'] then
        src_width = 0
        image['srcset'].split(',').each do |src_fragment|
          src_fragment.gsub!(/\s*([^\s]+)\s+([0-9]+)(w|x)/) { |url, size|
            if size.to_i > src_width then
              src = url
              src_width = size.to_i
            end
          }
        end
      else
        src = image['src']
      end

      src
    end
  end
end

Liquid::Template.register_filter(Jekyll::FirstImageUrlFilter)
