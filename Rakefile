require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"
require "algoliasearch"

namespace :site do
  jekyll_config = Jekyll.configuration(source: '.', destination: '_site')
  jekyll_site = Jekyll::Site.new(jekyll_config)

  desc "Generate blog files"
  task :generate do
    jekyll_site.process
  end

  desc "Generate, index and publish blog to gh-pages"
  task :index, [:algolia_api_key] => :generate do |t, args|
    raise "missing algolia_api_key argument" if args[:algolia_api_key].nil?

    # send all title/urls to Algolia's indexing API
    Algolia.init application_id: jekyll_config['algolia']['application_id'], api_key: args[:algolia_api_key]
    index = Algolia::Index.new(jekyll_config['algolia']['index_name'])

    index.set_settings attributesToIndex: ['title', 'content', 'unordered(url)']
    index.clear! rescue "not fatal"
    index.add_objects jekyll_site.posts.map { |post| {
      title: post.title,
      url: post.url,
      date: post.date,
      content: post.content.gsub(/<[^>]*>/ui, '').gsub(/<!--(.*?)-->[\n]?/m, "")
    } }
  end
end
