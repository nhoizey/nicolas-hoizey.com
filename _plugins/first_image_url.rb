require 'nokogiri'

module Jekyll
  module FirstImageUrlFilter

    def first_image_url(content)
      return '' if content.nil?

      doc = Nokogiri::HTML.fragment(content.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      image_elements = doc.css('img')

      return '' if image_elements.empty?

      src = ''
      image = image_elements.first.to_h
      if image['srcset'] then
        src = image['srcset'].scan(/([^, ][^ ]+)\s+([0-9]+)w/).map{ |url, size| { 'url' => url.strip, 'size' => size.to_i } }.reduce({ 'url' => '', 'size' => 0 }){ |current, new| current = new if new['size'] > current['size'] }['url']
      elsif image['src'] then
        src = image['src']
      end

      src
    end
  end
end

Liquid::Template.register_filter(Jekyll::FirstImageUrlFilter)
