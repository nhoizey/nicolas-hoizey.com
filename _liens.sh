#!/bin/sh

y=$(date +"%Y")
m=$(date +"%m")
d=$(date +"%d")

# Create post parent folder
dest_parent="./_posts/$y/$m"
mkdir -p $dest_parent

# Create links post
dest="$dest_parent/$y-$m-$d-quelques-liens-a-visiter"
/usr/local/bin/pinpress pins last | grep -v "# No data matching your arguments..." > $dest
