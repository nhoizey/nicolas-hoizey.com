#!/bin/sh
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config_credentials.yml
