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
      verbose: true
      presets:
        default:
          min_size: 320
          max_size: 1600
          steps: 5
          sizes: "(min-width: 50rem) 50rem, 90vw"
          attributes:
            class: onethird

=end
module Jekyll

  class CloudinaryTag < Liquid::Tag
    # priority :normal

    require "RMagick"

    def initialize(tag_name, markup, tokens)
      @markup = markup
      super
    end

    def render(context)

      # Default settings
      preset_defaults = {
        "min_width" => 320,
        "max_width" => 1200,
        "steps" => 5,
        "sizes" => "100vw",
        "caption" => "auto",
        "attributes" => { },
        "verbose" => false
      }

      # Settings
      site = context.registers[:site]
      url = site.config['url']
      settings = site.config['cloudinary']

      preset_user_defaults = {}
      if settings['presets']
        if settings['presets']['default']
          preset_user_defaults = settings['presets']['default']
        end
      end

      preset = preset_defaults.merge(preset_user_defaults)

      # Render any liquid variables in tag arguments and unescape template code
      rendered_markup = Liquid::Template.parse(@markup).render(context).gsub(/\\\{\\\{|\\\{\\%/, '\{\{' => '{{', '\{\%' => '{%')

      # Extract tag segments
      markup = /^(?:(?<preset>[^\s.:\/]+)\s+)?(?<image_src>[^\s]+\.[a-zA-Z0-9]{3,4})\s*(?<html_attr>[\s\S]+)?$/.match(rendered_markup)
      raise "Cloudinary can't read this tag. Try {% cloudinary [preset] path/to/img.jpg [attr=\"value\"] %}." unless markup

      image_src = markup[:image_src]

      # Build source image URL
      is_image_path_absolute = /^\/.*$/.match(image_src)
      if is_image_path_absolute
        image_path = File.join(site.config['destination'], image_src)
        image_url = File.join(url, image_src)
      else
        image_path = File.join(site.config['destination'], File.dirname(context['page'].url), image_src)
        image_url = File.join(url, File.dirname(context['page'].url), image_src)
      end

      # Get source image natural width
      image = Magick::Image::read(image_path).first
      natural_width = image.columns

      if markup[:preset]
        if settings['presets'][markup[:preset]]
          preset = preset.merge(settings['presets'][markup[:preset]])
        else
          if settings['verbose']
            puts "\n[Cloudinary] '#{markup[:preset]}' preset for the Cloudinary plugin doesn't exist in _config.yml, using the default one"
          end
        end
      end

      attributes = preset['attributes']

      # Deep copy preset for single instance manipulation
      instance = Marshal.load(Marshal.dump(preset))

      # Process attributes
      html_attr = if markup[:html_attr]
                    Hash[ *markup[:html_attr].scan(/(?<attr>[^\s="]+)(?:="(?<value>[^"]+)")?\s?/).flatten ]
                  else
                    {}
                  end

      if instance['attr']
        html_attr = instance.delete('attr').merge(html_attr)
      end

      # Classes from the tag should complete, not replace, the ones from the preset
      if html_attr['class'] && attributes['class']
        html_attr['class'] << " #{attributes['class']}"
      end
      html_attr = attributes.merge(html_attr)

      # Deal with the "caption" attribute as a true <figcaption>
      if html_attr['caption']
        caption = html_attr['caption']
        html_attr.delete('caption')
      end

      # alt and title attributes should go only to the <img> even when there is a caption
      img_attr = ""
      if html_attr['alt']
        img_attr << " alt=\"#{html_attr['alt']}\""
        html_attr.delete('alt')
      end
      if html_attr['title']
        img_attr << " title=\"#{html_attr['title']}\""
        html_attr.delete('title')
      end

      attr_string = html_attr.map { |a,v| "#{a}=\"#{v}\"" }.join(' ')

      srcset = []
      steps = preset['steps'].to_i
      min_width = preset['min_width'].to_i
      max_width = preset['max_width'].to_i
      step_width = (max_width - min_width) / steps
      sizes = preset['sizes']

      if natural_width < min_width
        if settings['verbose']
          puts "[Cloudinary] Natural width of source image '#{File.basename(image_src)}' (#{natural_width}px) in #{context['page'].path} not enough for creating any srcset version"
        end
        srcset << "http://res.cloudinary.com/#{settings['api_id']}/image/fetch/q_auto,f_auto/#{image_url} #{natural_width}w"
      else
        (0..steps).each do |factor|
          width = min_width + factor * step_width
          if width <= natural_width
            srcset << "http://res.cloudinary.com/#{settings['api_id']}/image/fetch/c_scale,w_#{width},q_auto,f_auto/#{image_url} #{width}w"
          else
            if settings['verbose']
              puts "[Cloudinary] Natural width of source image '#{File.basename(image_src)}' (#{natural_width}px) in #{context['page'].path} not enough for creating #{width}px version"
            end
          end
        end
      end
      srcset_string = srcset.join(",\n")

      # preset['caption'] can be 'never', 'auto' or 'always'
      if (caption || preset['caption'] == 'always') && preset['caption'] != 'never'
        "\n<figure #{attr_string}>\n<img src=\"#{image_url}\" srcset=\"#{srcset_string}\" sizes=\"#{sizes}\" #{img_attr} />\n<figcaption>#{caption}</figcaption>\n</figure>\n"
      else
        "<img src=\"#{image_url}\" srcset=\"#{srcset_string}\" sizes=\"#{sizes}\" #{attr_string} #{img_attr} />"
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

