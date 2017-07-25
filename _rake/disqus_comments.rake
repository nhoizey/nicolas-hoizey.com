require "rubygems"
require "net/https"
require "uri"
require "json"
require "domainatrix"
require "date"
require "yaml/store"
require "yaml"

require "jekyll"

desc "Sync Disqus comments"
task :disquscomments do
  site = Jekyll.configuration({})

  unless site["comments"] && site["comments"]["disqus"] &&
      site["comments"]["disqus"]["api_key"]
    raise "Disqus API key missing from `_config.yml`"
  end

  commentsdirectory = "_comments/"
  jekyll_site = Jekyll::Site.new(site)

  jekyll_site.reset
  jekyll_site.read
  jekyll_site.generate

  if site["comments"] && site["comments"]["disqus"] &&
      site["comments"]["disqus"]["short_name"]
    site_disqus_short_name = site["comments"]["disqus"]["short_name"]
  end

  jekyll_site.posts.docs.each do |post|
    if post.data["published"] == "false" || post.data["comments"] == "false"
      next
    end

    post_id   = post.id
    post_date = post.date
    post_file = commentsdirectory + post_date.strftime("%Y-%m-%d-") + post.data['slug']

    if (post.data["comments"].class == "Array") &&
        (post.data["comments"]["disqus"].class == "Array") &&
        post.data["comments"]["disqus"]["short_name"]
      post_disqus_short_name = post.data["comments"]["disqus"]["short_name"]
    end

    unless post_disqus_short_name || site_disqus_short_name
      next
    end

    ident = if post.data["comments"] && post.data["comments"]["disqus"] &&
        post.data["comments"]["disqus"]["short_name"]
              post.data["comments"]["disqus"]["postid"]
            elsif post.data["blogger"] && post.data["blogger"]["postid"]
              post.data["blogger"]["postid"]
            else
              "#{site['url']}#{post.id}.html"
            end

    siteid  = post_disqus_short_name || site_disqus_short_name
    api_key = site["comments"]["disqus"]["api_key"]

    uri = "http://disqus.com/api/3.0/threads/listPosts.json?forum=" \
        "#{siteid}&thread:ident=#{ident}&api_key=#{api_key}&limit=100"
    url = URI.parse(uri)
    http = Net::HTTP.new(url.host, url.port)
    request = Net::HTTP::Get.new(url.request_uri)
    response = http.request(request)

    unless response.code == "200"
      warn "\r\e[33mComments feed not found:\e[0m #{post_id}"
    end

    next unless response.code == "200"
    json_rep = JSON.parse(response.body)

    next unless json_rep["response"] && !json_rep["response"].empty?

    comments = json_rep["response"]

    comments.each do |comment|
      comments_date = DateTime.parse(comment["createdAt"])
      post_created  = comments_date.strftime("%Y-%m-%d %H:%M:%S %z")
      comments_date = comments_date.new_offset("+00:00")
      comments_file = comments_date.strftime("%Y-%m-%d-%H%M%S")

      next if File.exist?("#{post_file}_#{comments_file}.txt")

      entry = YAML::Store.new("#{post_file}_#{comments_file}.txt")
      entry.transaction do
        entry["id"]                = "comment-" + comment["id"]
        entry["source"]            = "Disqus"
        entry["date"]              = post_created
        entry["updated"]           = post_created
        entry["post_id"]           = post_id
        entry["author"]            = {}
        if comment["author"]["url"]
          entry["author"]["url"] = comment["author"]["url"]
        end
        entry["author"]["email"] = if comment["author"]["email"]
                                     comment["author"]["email"]
                                   else
                                     "noreply@blogger.com"
                                   end
        if comment["author"]["avatar"]["permalink"]
          entry["author"]["image"] = comment["author"]["avatar"]["permalink"]
        end
        entry["author"]["name"]    = comment["author"]["name"]
        entry["content"]           = comment["message"].to_str.gsub("<br>", "<br />")
        entry["title"]             = comment["message"].to_str.gsub("<br>", "<br />")
      end
    end
  end
end
