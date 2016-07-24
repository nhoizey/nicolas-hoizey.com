class Vimeo < Liquid::Tag
  Syntax = /^\s*(\d+)\s*$/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

    else
      raise "No Vimeo ID provided in the \"vimeo\" tag"
    end
  end

  def render(context)

    puts " Vimeo: video #{@id}"

    result =  "<div class=\"ratio-16-9 embed-video-container\"><iframe src=\"https://player.vimeo.com/video/#{@id}\" width=\"800\" height=\"450\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>"

    return result

  end

  Liquid::Template.register_tag "vimeo", self
end
