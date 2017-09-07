#  (c) Etienne Rossignon
#  Licence : MIT
#
#  https://github.com/erossignon/jekyll-youtube-lazyloading
#
#  this liquid plugin insert a embeded youtube video to your octopress or Jekill blog
#  using the following syntax:
#    {% youtube ABCDEF123  %}
#
#  this plugin has been designed to optimize loading time when many youtube videos
#  are inserted to a single page by delaying the youtube <iframe>'s until the user
#  click on the thumbnail image of the video.
#
#  Special care have been taken to make sure tha the video resizes properly when
#  the webbrowser page width changes, or on smartphones.
#
#
#
#  a jsfiddle to experiment the lazy loading process can be found at :
#        http://jsfiddle.net/erossignon/3DZ6f
#
# credits:
#   responsive video :
#       https://github.com/optikfluffel/octopress-responsive-video-embed
#       http://andmag.se/2012/10/responsive-images-lazy-load-and-multiserve-images/
#   lazy loading:
#       http://jsfiddle.net/mUqNj/ and http://yabtb.blogspot.com/2011/12/lazy-load-youtube-videos.html
#   jekyll plugin:
#       http://makokal.github.com/blog/2012/02/24/simple-jekyll-plugin-for-youtube-videos/
#       https://gist.github.com/1805814
#
require 'json'
require 'erb'
require 'yt'
require 'digest'

class YouTube < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/
  Cache = Hash.new

  def initialize(tagName, markup, tokens)
    super

    @cache_folder = '.jekyll-cache/youtube'
    Dir.mkdir(@cache_folder) unless File.exists?(@cache_folder)

    if markup =~ Syntax then
      @id = $1

      if $2.nil? then
          @width = 560
          @height = 315
      else
          @width = $2.to_i
          @height = $3.to_i
      end
    else
      raise "No YouTube ID provided in the \"youtube\" tag"
    end
  end

  def render(context)

    if (Cache.has_key?(@id)) then
        return Cache[@id]
    end

    @cache_file = File.join(@cache_folder, Digest::MD5.hexdigest("#{@id}"))

    if (File.exists?(@cache_file))
      @video_data = JSON.parse(File.read(@cache_file))
      Jekyll.logger.info("[Youtube]", "#{@video_data['title']} (cached)")
    else
      site = context.registers[:site]
      settings = site.config['youtube']
      api_key = settings['api_key']

      Yt.configure do |config|
        config.api_key = api_key
      end

      video = Yt::Video.new id: @id

      # extract the title and description
      @video_data = {
        'title' => video.title,
        'description' => video.description
      }
      Jekyll.logger.info("[Youtube]", "#{@video_data['title']}")

      # Cache the result in a file
      File.open(@cache_file, "w") do |f|
        f.write(@video_data.to_json)
      end
    end

    @style = "width:100%;height:100%;background:#000 url(https://i2.ytimg.com/vi/#{@id}/0.jpg) center center no-repeat;background-size:contain;position:absolute"

    @emu = "https://www.youtube.com/embed/#{@id}?autoplay=1"

    @videoFrame =  CGI.escapeHTML("<iframe style=\"vertical-align:top;width:100%;height:100%;position:absolute;\" src=\"#{@emu}\" frameborder=\"0\" allowfullscreen></iframe>")

    # with jQuery
    #@onclick    = "$('##{@id}').replaceWith('#{@videoFrame}');return false;"

    # without JQuery
    @onclick    = "var myAnchor = document.getElementById('#{@id}');" +
                  "var tmpDiv = document.createElement('div');" +
                  "tmpDiv.innerHTML = '#{@videoFrame}';" +
                  "myAnchor.parentNode.replaceChild(tmpDiv.firstChild, myAnchor);"+
                  "return false;"

   # note: so special care is required to produce html code that will not be massage by the
   #       markdown processor :
   #       extract from the markdown doc :
   #           'The only restrictions are that block-level HTML elements � e.g. <div>, <table>, <pre>, <p>, etc.
   #            must be separated from surrounding content by blank lines, and the start and end tags of the block
   #            should not be indented with tabs or spaces. '
   result = <<-EOF

<div class="ratio-4-3 embed-video-container" onclick="#{@onclick}" title="click here to play">
<a class="youtube-lazy-link" style="#{@style}" href="https://www.youtube.com/watch?v=#{@id}" id="#{@id}" onclick="return false;">
<div class="youtube-lazy-link-div"></div>
<div class="youtube-lazy-link-info">#{@video_data['title']}</div>
</a>
<div class="video-info" >#{@video_data['description']}</div>
</div>

EOF

    Cache[@id] = result

    return result

  end

  Liquid::Template.register_tag "youtube", self
end
