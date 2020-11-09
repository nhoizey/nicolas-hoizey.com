#!/bin/sh
echo "Sync branch on server from local"
/usr/local/bin/rsync -arvu --delete-delay --iconv=UTF8-MAC,UTF-8 ./_site/ nhoizey@ssh-nhoizey.alwaysdata.net:/home/nhoizey/www/nicolas-hoizey.com/branch/ 2>&1 | tee ./_logs/deploy.log
