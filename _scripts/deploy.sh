#!/bin/sh
# First create a backup on the server, for quick rollback
ssh nhoizey@ssh-nhoizey.alwaysdata.net /home/nhoizey/backup-nhocom.sh

echo "Sync server from local"
/usr/local/bin/rsync -arvu --delete-delay --iconv=UTF8-MAC,UTF-8 ./_site/ nhoizey@ssh-nhoizey.alwaysdata.net:/home/nhoizey/www/nicolas-hoizey.com/www/ 2>&1 | tee ./_logs/deploy.log

echo "Update Algolia index"
npm run algolia

echo "Send tweets"
# npm run tweets
