=begin
  New Liquid tag to use Cloudinary for optimized responsive posts images.
  Usage:
    {% cloudinary [preset] path/to/img.jpg [attr="value"] %}
  Examples:
    {% cloudinary image1.jpg alt="alternate" %}
    {% cloudinary onethird image2.jpg alt="other" title="yet another one" %}

  Configuration
    In _config.yml:

    cloudinary:
      api_id: …
      auto: true
      presets:
        default:
          min_size: 320
          max_size: 1600
          steps: 5
          sizes: "(min-width: 50rem) 50rem, 90vw"

=end
module Jekyll

  class CloudinaryTag < Liquid::Tag
    # priority :normal

    def initialize(tag_name, markup, tokens)
      @markup = markup
      super
    end

    def render(context)

      # Settings
      site = context.registers[:site]
      url = site.config['url']
      settings = site.config['cloudinary']
      api_id = settings['api_id']

      # Render any liquid variables in tag arguments and unescape template code
      rendered_markup = Liquid::Template.parse(@markup).render(context).gsub(/\\\{\\\{|\\\{\\%/, '\{\{' => '{{', '\{\%' => '{%')

      # Extract tag segments
      markup = /^(?:(?<preset>[^\s.:\/]+)\s+)?(?<image_src>[^\s]+\.[a-zA-Z0-9]{3,4})\s*(?<html_attr>[\s\S]+)?$/.match(rendered_markup)
      raise "Cloudinary can't read this tag. Try {% cloudinary [preset] path/to/img.jpg [attr=\"value\"] %}." unless markup

      preset = settings['presets'][ markup[:preset] ] || settings['presets']['default']

      # Deep copy preset for single instance manipulation
      instance = Marshal.load(Marshal.dump(preset))

      # Process attributes
      html_attr = if markup[:html_attr]
                    Hash[ *markup[:html_attr].scan(/(?<attr>[^\s="]+)(?:="(?<value>[^"]+)")?\s?/).flatten ]
                  else
                    {}
                  end

      if html_attr['caption']
        caption = html_attr['caption']
        html_attr.delete('caption')
      end

      attr_string = html_attr.map { |a,v| "#{a}=\"#{v}\"" }.join(' ')

      # Build source image URL
      is_image_path_absolute = /^\/.*$/.match(markup[:image_src])
      if is_image_path_absolute
        image_url = File.join(url, markup[:image_src])
      else
        image_url = File.join(url, File.dirname(context['page'].url), markup[:image_src])
      end

      srcset = []
      steps = preset['steps'].to_i
      min_width = preset['min_width'].to_i
      max_width = preset['max_width'].to_i
      step_width = (max_width - min_width) / steps
      sizes = preset['sizes']
      (0..steps).each do |factor|
        width = min_width + factor * step_width
        srcset << "http://res.cloudinary.com/#{api_id}/image/fetch/c_scale,w_#{width},q_auto,f_auto/#{image_url} #{width}w"
      end

      if caption
        "\n<figure>#{img}<figcaption>#{caption}</figcaption>\n</figure>\n"
      else
        img
      end
    end
  end

  class Cloudinarify < Converter
    # priority :high

    def matches(ext)
      ext.downcase == ".md"
    end

    def output_ext(ext)
      ".md"
    end

    def convert(content)
      site = Jekyll::Site.new(@config)
      settings = site.config['cloudinary']
      auto = settings['auto']

      if auto
        image = /\!\[(.*)\]\(([^ ]+)( "([^"]+)")?\)({:caption="([^"]+)"})?/
        content.gsub(image, "{% cloudinary \\2 alt=\"\\1\" title=\"\\4\" caption=\"\\6\" %}")
      else
        content
      end
    end
  end


end
Liquid::Template.register_tag('cloudinary', Jekyll::CloudinaryTag)

