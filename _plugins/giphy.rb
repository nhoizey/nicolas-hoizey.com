class Giphy < Liquid::Tag
  Syntax = /^\s*(\d+)\s*$/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

    else
      raise "No Giphy ID provided in the \"giphy\" tag"
    end
  end

  def render(context)

    # Jekyll.logger.info("[Giphy]", "#{@id}")

    # Embed:  https://giphy.com/embed/TseBjMu53JgWc
    # Source: https://media.giphy.com/media/TseBjMu53JgWc/giphy.gif
    # MP4:    https://media.giphy.com/media/TseBjMu53JgWc/giphy.mp4

    result =  "<div class=\"ratio-16-9 embed-video-container\"><iframe src=\"https://player.vimeo.com/video/#{@id}\" width=\"800\" height=\"450\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"

    return result

  end

  Liquid::Template.register_tag "giphy", self
end
