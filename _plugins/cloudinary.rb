class Cloudinarify < Jekyll::Converter
  safe true
  priority :high

  def matches(ext)
    ext.downcase == ".md"
  end

  def output_ext(ext)
    ".md"
  end

  def convert(content)
    image = /\!\[(.*)\]\(([^ ]+)( "([^"]+)")?\)/
    # cloudinaryUrl = "http://res.cloudinary.com/#{site.cloudinary_id}/image/fetch/"
    cloudinaryUrl = "http://res.cloudinary.com/nho/image/fetch/"
    # siteUrl = site.url
    siteUrl = "https://nicolas-hoizey.com/"

    content.gsub(image, "
<img
  src=\"#{cloudinaryUrl}w_640/#{siteUrl}\\2\"
  alt=\"\\1\"
  title=\"\\4\"
  srcset=\"
    #{cloudinaryUrl}w_320/#{siteUrl}\\2 320w,
    #{cloudinaryUrl}w_640/#{siteUrl}\\2 640w,
    #{cloudinaryUrl}w_960/#{siteUrl}\\2 960w,
    #{cloudinaryUrl}w_1200/#{siteUrl}\\2 1200w
    \"
  sizes=\"100vw\"
/>")
  end
end
