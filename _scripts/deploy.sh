#!/bin/sh

# Sync online
/usr/local/bin/rsync -arvu --delete-delay --iconv=UTF8-MAC,UTF-8 ./_site/ nhoizey@ssh-nhoizey.alwaysdata.net:/home/nhoizey/www/nicolas-hoizey.com/www/

# Ping Google and Bing about new content
# /usr/bin/curl http://www.google.com/ping?sitemap=https://nicolas-hoizey.com/sitemap.xml > /dev/null
# /usr/bin/curl http://www.bing.com/webmaster/ping.aspx?sitemap=https://nicolas-hoizey.com/sitemap.xml > /dev/null
