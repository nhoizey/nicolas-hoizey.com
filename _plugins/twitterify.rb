require 'nokogiri'

module Jekyll
  module TwitterifyFilter

    def twitterify(raw)
      document = Nokogiri::HTML.fragment(raw.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      for block in ['del'] do
        document.css(block).each do |element|
          element.content = element.content.gsub(/(.)/) {|c| "#{c}\u0336"}
        end
      end

      document.inner_html

    end
  end
end

Liquid::Template.register_filter(Jekyll::TwitterifyFilter)
