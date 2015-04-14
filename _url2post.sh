#!/usr/bin/env bash

if [ -z "$1" ]; then
	echo "Usage: provide an URL."
	exit -1
else
	url="$@"
fi

name = `curl -O "$url"`

echo $name
# d=$(echo ${content/.*\noldurl:/})

# echo $d

# slug=$(echo $title | tr '[:upper:]' '[:lower:]' | tr '[:space:]' '-' | tr '[:punct:]' '-')
# slug="${slug:0:${#slug}-1}"
# post="./_drafts/$d-$slug.md"

# body=""
# read -d '' body <<EOF
# ---
# title:			$title
# lang:				fr
# tags: 			[ , ]
# ---

# EOF

# echo "$body" > $post
# /Applications/MacDown.app/Contents/MacOS/MacDown $post &
