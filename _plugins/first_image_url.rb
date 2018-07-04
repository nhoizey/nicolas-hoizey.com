require 'nokogiri'

module Jekyll
  module FirstImageUrlFilter

    # https://gist.github.com/nhoizey/224a1c9dfb396a4c7b41ea114f175712#gistcomment-2637934
    def extract_largest_image(srcset)
      srcset
        .scan(/(\S+)\s+(\d+)w/)
        .map { |url, size| { url: url.strip, size: size.to_i } }
        .inject { |acc, cur| acc[:size] < cur[:size] ? cur : acc }[:url]
    end

    def first_image_url(content)
      return '' if content.nil?

      doc = Nokogiri::HTML.fragment(content.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      image_elements = doc.css('img')

      return '' if image_elements.empty?

      image = image_elements.first.to_h

      if image['srcset'] then
        src = extract_largest_image(image['srcset'])
      elsif image['src'] then
        src = image['src']
      else
        src = ''
      end

      src
    end
  end
end

Liquid::Template.register_filter(Jekyll::FirstImageUrlFilter)
