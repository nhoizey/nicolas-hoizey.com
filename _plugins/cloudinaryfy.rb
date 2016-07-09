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
        image_regex = /\!\[(?<alt>[^\]]*)\]\((?<url>[^\ )]+)( "(?<title>[^"]+)")?\)(\{\:\.(?<class>[^\}]+)\}|\{\:caption="(?<caption>[^"]+)"\}|\{\:preset="(?<preset>[^"]+)"\})*/
        liquid_tag = '{% cloudinary \k<preset> alt="\k<alt>" title="\k<title>" caption="\k<caption>" class="\k<class>" %}'
        content.gsub(image_regex, liquid_tag)
      else
        content
      end
    end
  end

end

