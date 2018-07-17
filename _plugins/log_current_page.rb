module Jekyll
  class CurrentPageLoggerTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
    end

    def render(context)
      Jekyll.logger.info('CurrentPageLogger', context["page"].inspect)
      ''
    end
  end
end

Liquid::Template.register_tag('log_current_page', Jekyll::CurrentPageLoggerTag)
