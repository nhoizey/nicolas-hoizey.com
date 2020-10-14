#!/bin/sh

if [ -z "$1" ]; then
  echo "Usage: name a draft."
  exit -1
else
  src="$@"
  if [ ! -d $src ]; then
    echo "Usage: there is no such draft."
    exit -1
  fi
fi

# http://stackoverflow.com/a/2664746/717195
name=${src##*/}

year=$(date +"%Y")
month=$(date +"%m")
day=$(date +"%d")
hour=$(date +"%H")
minute=$(date +"%M")
second=$(date +"%S")

# Create post parent folder
dest_parent="./src/articles/$year/$month/$day"
mkdir -p $dest_parent

# Move draft folder to posts
dest="$dest_parent/"
mv $src $dest

# Add current date/time
# https://stackoverflow.com/a/18273421/717195
# https://stackoverflow.com/a/19075707/717195
awk -v datetime="date: $year-$month-$day $hour:$minute:$second +02:00" 'NR==2{print datetime}007' "$dest/$name/index.md" > "$dest/$name/index-temp.md"
mv -f "$dest/$name/index-temp.md" "$dest/$name/index.md"
