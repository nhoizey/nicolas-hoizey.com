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
billet="$folder/index.md"

if [ -f "$billet" ]; then
  # update the time to latest call
  sed -i '' "s/^date: .*$/date: $year-$month-$day $hour:$minute:$second $timezone:00/" $billet
else
  mkdir -p "$folder"
  body=""
  read -d '' body <<EOF
---
date: $year-$month-$day $hour:$minute:$second $timezone:00
tags: []
$(node ./_scripts/get-a-photo-of-the-day.js)
---

$content

EOF

  echo "$body" > "$billet"
fi

open "$folder"
/opt/homebrew/bin/code "$billet" &
