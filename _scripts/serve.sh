#!/bin/sh
bundle exec jekyll serve --config _config.yml,_config_credentials.yml --limit_posts 15  --destination _site_serve -t
