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

y=$(date +"%Y")
m=$(date +"%m")
d=$(date +"%d")

# Create post parent folder
dest_parent="./_posts/$y/$m"
mkdir -p $dest_parent

# Move draft folder to posts
dest="$dest_parent/$d-$name"
mv $src $dest

# Rename Markdown file
mv "$dest/$name.md" "$dest/$y-$m-$d-$name.md"
