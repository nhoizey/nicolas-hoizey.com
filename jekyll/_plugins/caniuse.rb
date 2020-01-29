# Based on https://caniuse.bitsofco.de/
class CanIUse < Liquid::Tag
  Syntax = /^\s*([[:alnum:]-]+)\s*$/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1

    else
      raise "No CanIUse feature id provided in the \"caniuse\" tag"
    end
  end

  def render(context)
    result = "
<script>
!function(){document.addEventListener(\"DOMContentLoaded\",function(){for(var e=document.getElementsByClassName(\"ciu_embed\"),t=0;t<e.length;t++){var s=e[t],r=s.getAttribute(\"data-feature\"),n=s.getAttribute(\"data-periods\"),a=s.getAttribute(\"data-accessible-colours\")||\"false\";if(r){var o=\"https://caniuse.bitsofco.de/embed/index.html\",i='<iframe src=\"'+o+\"?feat=\"+r+\"&periods=\"+n+\"&accessible-colours=\"+a+'\" frameborder=\"0\" width=\"100%\" height=\"400px\"></iframe>';s.innerHTML=i}else s.innerHTML=\"A feature was not included. Go to <a href='https://caniuse.bitsofco.de/#how-to-use'>https://caniuse.bitsofco.de/#how-to-use</a> to generate an embed.\"}var l=window.addEventListener?\"addEventListener\":\"attachEvent\";(0,window[l])(\"attachEvent\"==l?\"onmessage\":\"message\",function(t){var s=t.data;if(\"string\"==typeof s&&s.indexOf(\"ciu_embed\")>-1)for(var r=s.split(\":\")[1],n=s.split(\":\")[2],a=0;a<e.length;a++){var o=e[a];if(o.getAttribute(\"data-feature\")===r){var i=parseInt(n)+30;o.childNodes[0].height=i+\"px\";break}}},!1)})}();
</script>
<p class=\"ciu_embed\" data-feature=\"#{@id}\" data-periods=\"future_2,future_1,current,past_1,past_2\" data-accessible-colours=\"false\"><a href=\"http://caniuse.com/#feat=#{@id}\">Can I Use #{@id}?</a> Data on support for the #{@id} feature across the major browsers from caniuse.com.</p>"

    return result

  end

  Liquid::Template.register_tag "caniuse", self
end
