# template.rb
#
# A light-weight templating wrapper using Liquid's custom blocks.
# It works very similarly to {% include %}, but content can be included within
# start/end tags.
#
# Example:
# {% template my-template.html %}
#   Content!
# {% endtemplate %}
#
# "my-template.html" would be a "template" file that can be found in:
# /src/_templates/my-template.html
#
# Parameters:
# Parameters can be passed using the standard liquid method (not Jekyll's)
#
# Example:
# {% template my-template.html id: "id-001", title: "Awesome" %}
require 'htmlcompressor'

module Jekyll
  module Tags
    class TemplateBlock < Liquid::Block
      include Liquid::StandardFilters
      Syntax = /(#{Liquid::QuotedFragment}+)?/

      def initialize(tag_name, markup, tokens)
        super

        # @template_name = markup
        if markup =~ Syntax

          @template_name = $1
          @attributes = {}
          @sanitize = false

          # Parse parameters
          # Source: https://gist.github.com/jgatjens/8925165
          markup.scan(Liquid::TagAttributes) do |key, value|
            @attributes[key] = Liquid::Expression.parse(value)
          end
        else
          raise SyntaxError.new(options[:locale].t("errors.syntax.include".freeze))
        end
      end

      def parse_content(context, content)
        content
      end

      def render(context)
        content = super
        compressor = HtmlCompressor::Compressor.new
        site = context.registers[:site]
        template = load_template(context)

        # Source:
        # https://github.com/Shopify/liquid/blob/9a7778e52c37965f7b47673da09cfb82856a6791/lib/liquid/tags/include.rb
        context['template_name'] = context.evaluate(@template_name)
        context['partial'] = true
        context['template'] = Hash.new

        if @attributes
          @attributes.each do |key, value|
            if value.instance_of? Liquid::VariableLookup
              # val = value.name
              val = context.evaluate(value)
            else
              val = context.evaluate(value)
            end
            context['template'][key] = val

            # Adjust sanitize if parse: html
            if (key == "parse") && (val == "html")
              @sanitize = true
            end
          end
        end

        content = parse_content(context, content)

        unless @sanitize
          converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
          content = content.to_s
          @content = converter.convert(content)
        else
          @content = content.to_s
        end

        context['template']['content'] = @content

        @output = template.render( context )
        @output = compressor.compress(@output)
      end

      def load_template(context)
        template_name = @template_name
        view = '_templates/' + template_name
        root_path = context.registers[:site].source
        file_path = File.join(root_path, view)
        source = File.read(file_path.strip)

        if source
          Liquid::Template.parse(source)
        else
          raise Liquid::SyntaxError, "Could not find #{view} in your templates"
        end
      end

    end
  end
end

Liquid::Template.register_tag('template', Jekyll::Tags::TemplateBlock)
