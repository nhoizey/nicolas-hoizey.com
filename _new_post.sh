#!/bin/sh

if [ -z "$1" ]; then
	echo "Usage: provide a title argument."
	exit -1
else
	title="$@"
fi

y=$(date +"%Y")
d=$(date +"%Y-%m-%d")
slug=$(echo $title | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-' | tr '[:punct:]' '-')
slug="${slug:0:${#slug}-1}"
post="./_drafts/$d-$slug.md"
assets="./_assets/fullsize-images/$y/$d-$slug/"

body=""
read -d '' body <<EOF
---
title:			$title
lang:				fr
tags:       [ ]
---

EOF

echo "$body" > $post
mkdir "$assets"

/Applications/MacDown.app/Contents/MacOS/MacDown $post &
