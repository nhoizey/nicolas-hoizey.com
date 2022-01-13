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
folder="./src/notes/$year/$month/$day"
mkdir -p "$folder"

number=1

while [ -d "$folder/$number" ]; do
  number=`expr $number + 1`
done

mkdir -p "$folder/$number"

note="$folder/$number/index.md"

body=""
read -d '' body <<EOF
---
date: $year-$month-$day $hour:$minute:$second $timezone:00
tags: []
---

$content

EOF

echo "$body" > "$note"

open "$folder/$number"
/usr/local/bin/code "$note" &
