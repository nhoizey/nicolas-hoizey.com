# http://penguindreams.org/blog/removing-footnotes-from-excerpts-in-jekyll/

require 'nokogiri'

module Jekyll
  module StripFootnotesFilter

    def strip_footnotes(raw)
      doc = Nokogiri::HTML.fragment(raw.encode('UTF-8', :invalid => :replace, :undef => :replace, :replace => ''))

      for block in ['div', 'sup', 'a'] do
        doc.css(block).each do |ele|
          ele.remove if (ele['class'] == 'footnotes' or ele['class'] == 'footnote')
        end
      end

      doc.inner_html

    end
  end
end

Liquid::Template.register_filter(Jekyll::StripFootnotesFilter)
