#!/usr/bin/env bash

if [ -z "$1" ]; then
echo "Usage: provide a title argument."
exit -1
else
title="$@"
fi

d=$(date +"%Y-%m-%d")

slug=$(echo $title | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-' | tr '[:punct:]' '-')
slug="${slug:0:${#slug}-1}"
post="./_drafts/$d-$slug.md"

body=""
read -d '' body <<EOF
---
title:			$title
lang:				fr
tags: 			[ , ]
---

EOF

echo "$body" > $post
/Applications/MacDown.app/Contents/MacOS/MacDown $post &
