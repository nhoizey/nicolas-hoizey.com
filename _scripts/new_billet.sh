#!/bin/sh

if [ -z "$1" ]; then
  content=""
else
  content="$@"
fi

year=$(date +"%Y")
month=$(date +"%m")
day=$(date +"%d")
hour=$(date +"%H")
minute=$(date +"%M")
second=$(date +"%S")
timezone=$(date +"%z" | cut -b 1-3)

# Create date folder if it doesn't exist yet
folder="./src/billets/$year/$month/$day"

if [ ! -d "$folder" ]; then

mkdir -p "$folder"
billet="$folder/index.md"

body=""
read -d '' body <<EOF
---
date: $year-$month-$day $hour:$minute:$second $timezone:00
tags: []
---

$content

EOF

echo "$body" > "$billet"
open "$folder"
/usr/local/bin/code "$billet" &

fi
