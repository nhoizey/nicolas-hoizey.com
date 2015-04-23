#!/bin/sh

if [ -z "$1" ]; then
	echo "Usage: provide a title argument."
	exit -1
else
	title="$@"
fi
slug=$(echo $title | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-' | tr '[:punct:]' '-')
slug="${slug:0:${#slug}-1}"

y=$(date +"%Y")
m=$(date +"%m")
d=$(date +"%d")

folder="./_drafts/$y/$m/$d-$slug"
mkdir -p $folder

post="$folder/$y-$m-$d-$slug.md"

body=""
read -d '' body <<EOF
---
title:			$title
lang:				fr
tags:       [ ]
---

EOF

echo "$body" > $post

/Applications/MacDown.app/Contents/MacOS/MacDown $post &
