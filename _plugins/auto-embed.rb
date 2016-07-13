module Jekyll
  module AutoEmbed

    class AutoEmbed < Converter

      def matches(ext)
        ext.downcase == ".md"
      end

      def output_ext(ext)
        ".md"
      end

      def convert(content)
        youtube_regex = /\nhttps?:\/\/www\.youtube\.com\/watch\?v=(?<youtube_id>[^\n]+)\n/
        youtube_html = '<div class="video-wrapper"><iframe class="youtube" type="text/html" width="800" height="490" src="https://www.youtube.com/embed/\k<youtube_id>?enablejsapi=1&origin=https://nicolas-hoizey.com" frameborder="0"></iframe></div>'
        content = content.gsub(youtube_regex, youtube_html)

        vimeo_regex = /\nhttps:\/\/vimeo\.com\/(?<vimeo_id>[0-9]+)\n/
        vimeo_html = '<div class="video-wrapper"><iframe src="https://player.vimeo.com/video/\k<vimeo_id>" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe></div>'
        content = content.gsub(vimeo_regex, vimeo_html)

        content
      end
    end

  end
end
