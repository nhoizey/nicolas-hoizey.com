class Giphy < Liquid::Tag
  Syntax = /^\s*(\w+)\s*$/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

    else
      raise "No Giphy ID provided in the \"giphy\" tag"
    end
  end

  def render(context)

    # Embed:  https://giphy.com/embed/TseBjMu53JgWc
    # Source: https://media.giphy.com/media/TseBjMu53JgWc/giphy.gif

    # .giphy {
    #   margin: 2em 0;
    #   padding: 0;
    # }
    # .giphy video {
    #   display: block;
    #   width: 100%;
    #   max-width: 500px;
    #   margin: 0 auto;
    # }

    site = context.registers[:site]
    if site.config["cloudinary"].nil?
      Jekyll.logger.abort_with("[Giphy]", "You must set your Cloudinary cloud_name in _config.yml")
    end
    settings = site.config["cloudinary"]
    if settings["cloud_name"] == ""
      Jekyll.logger.abort_with("[Giphy]", "You must set your Cloudinary cloud_name in _config.yml")
    end
    cloudname = settings["cloud_name"]

    cloudinaryPrefix = "https://res.cloudinary.com/#{cloudname}/image/fetch"
    giphyImage = "https://media.giphy.com/media/#{@id}/giphy.gif"
    webmSource = "<source src=\"#{cloudinaryPrefix}/f_webm/#{giphyImage}\" type=\"video/webm\">"
    mp4Source = "<source src=\"#{cloudinaryPrefix}/f_mp4/#{giphyImage}\" type=\"video/mp4\">"
    posterUrl = "#{cloudinaryPrefix}/f_jpg/#{giphyImage}"
    fallback = "<p>Your browser doesn't support video. See <a href=\"#{giphyImage}\">the animated GIF</a>.</p>"
    # videoTag = "<video controls loop muted playsinline preload=\"auto\" crossorigin=\"anonymous\" poster=\"#{posterUrl}\">#{webmSource}#{mp4Source}#{fallback}</video>"
    videoTag = "<video controls loop muted playsinline preload=\"auto\" crossorigin=\"anonymous\">#{webmSource}#{mp4Source}#{fallback}</video>"

    return "<div class=\"giphy\">#{videoTag}</div>"

  end

  Liquid::Template.register_tag "giphy", self
end
