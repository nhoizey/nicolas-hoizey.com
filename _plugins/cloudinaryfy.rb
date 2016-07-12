=begin
  Tranforms standard Kramdown image syntax into Cloudinary plugin Liquid tag

  Usage:
    Install. Done.

  Examples:
    ![Cloudflare](cloudflare.png){:caption="Un schéma montrant l'apport de Cloudflare"}
    ![Cloudflare](cloudflare.png){:caption="Un schéma montrant l'apport de Cloudflare"}{:.laclasse}
    ![Cloudflare](cloudflare.png "quoi ?"){:.lasuperclasse}{:caption="Un schéma montrant l'apport de Cloudflare"}{:.laclasse}
    ![Cloudflare](cloudflare.png "quoi ?"){:.lasuperclasse}{:caption="Un schéma montrant l'apport de Cloudflare"}{:.laclasse}{:preset="onethird"}

    will become

    {% cloudinary alt=”Cloudflare” title=”” caption=”Un schéma montrant l’apport de Cloudflare” class=”” %}
    {% cloudinary alt=”Cloudflare” title=”” caption=”Un schéma montrant l’apport de Cloudflare” class=”laclasse” %}
    {% cloudinary alt=”Cloudflare” title=”quoi ?” caption=”Un schéma montrant l’apport de Cloudflare” class=”laclasse” %}
    {% cloudinary onethird alt=”Cloudflare” title=”quoi ?” caption=”Un schéma montrant l’apport de Cloudflare” class=”laclasse” %}

  Configuration
    None.
=end
module Jekyll
  module Cloudinarify

    class Cloudinarify < Converter
      IMAGE_REGEX = /\!\[(?<alt>[^\]]*)\]\((?<url>[^\ )]+)( "(?<title>[^"]+)")?\)(\{\:\.(?<class>[^\}]+)\}|\{\:caption="(?<caption>[^"]+)"\}|\{\:preset="(?<preset>[^"]+)"\})*/
      LIQUID_TAG = '{% cloudinary \k<preset> \k<url> alt="\k<alt>" title="\k<title>" caption="\k<caption>" class="\k<class>" %}'

      def matches(ext)
        ext.downcase == ".md"
      end

      def output_ext(ext)
        ".md"
      end

      def markdown2cloudinary(image)
        tag = '{% cloudinary '
        if (image['preset'])
          tag += image['preset'] + ' '
        end
        tag += image['url'] + ' '
        if (image['alt'])
          tag += 'alt="' + image['alt'] + '" '
        end
        if (image['title'])
          tag += 'title="' + image['title'] + '" '
        end
        if (image['caption'])
          tag += 'caption="' + image['caption'] + '" '
        end
        if (image['class'])
          tag += 'class="' + image['class'] + '" '
        end
        tag += '%}'

        # html = Liquid::Template.parse(tag).render(context)
        # html

        tag
      end

      def convert(content)
        content.gsub(IMAGE_REGEX) { markdown2cloudinary($~) }
      end
    end

  end
end

