#!/bin/sh

content="`/usr/local/bin/pinpress pins last -n 50 | grep -v '# No data matching your arguments...'`"
lines=`echo "$content" | wc -l`

if [ $lines -gt 1 ]
then
  y=$(date +"%Y")
  m=$(date +"%m")
  d=$(date +"%d")

  dest_parent="./_drafts/en-vrac"
  dest_file="$dest_parent/en-vrac.md"

  if [ ! -f $dest_file ]
  then
    # Create post parent folder
    mkdir -p $dest_parent

    # Initiate file with YAML front matter
    cat <<EOYFT >> $dest_file
---
title: En vrac
lang:  fr
tags:  [liens]
---

Assez régulièrement, je vais essayer de vous faire profiter des liens vers les sites, articles ou projets les plus intéressants que je trouve au cours de mes pérégrinations sur le Web.

EOYFT
    fi

  echo "$content" >> $dest_file
  /Applications/MacDown.app/Contents/MacOS/MacDown "$dest_file" &
else
  echo "No new link"
fi
