const svgstore = require('svgstore');
const fs = require('fs');
const path = require('path');

// Where are Feather icons available from the npm package?
const ICONS_FOLDERS = {
  feather: 'node_modules/feather-icons/dist/icons/',
  simple: 'node_modules/simple-icons/icons/',
  local: 'assets/svg/',
};

// Which icons do I need for the sprite?
// icon filename + title for accessibility
const ICONS_LIST = {
  feather: {
    anchor: { title: 'Anchor' },
    calendar: { name: 'date', title: 'Date' },
    info: { title: 'Info' },
    link: { title: 'Link' },
    'map-pin': { name: 'location', title: 'Location' },
    'message-circle': { name: 'reactions', title: 'Reactions' },
    rss: { name: 'feeds', title: 'Feeds' },
    search: { title: 'Search' },
    tag: { name: 'tags', title: 'Tag' },
    twitter: { title: 'Twitter' },
    user: { name: 'author', title: 'Author' },
    wifi: { name: 'online', title: 'Online' },
    'wifi-off': { name: 'offline', title: 'Offline' },
  },
  simple: {
    // flickr: { title: 'Flickr' },
    // github: { title: 'GitHub' },
    mastodon: { title: 'Mastodon' },
  },
  local: {
    older: { title: 'Older' },
    newer: { title: 'Newer' },
  },
};

// Initiate the sprite with svgstore
let sprite = svgstore({
  // Add these attributes to the sprite SVG
  svgAttrs: { style: 'display: none;', 'aria-hidden': 'true' },
  // Copy these attributes from the icon source SVG to the symbol in the sprite
  copyAttrs: ['width', 'height'],
});

// Loop through each icon in the list
Object.entries(ICONS_LIST).forEach(([source, icons]) => {
  Object.entries(icons).forEach(([icon, properties]) => {
    // Log the name of the icon and its title to the console
    console.log(`${icon}.svg -> ${properties.title}`);
    const svgFile = fs
      // Load the content of the icon SVG file
      .readFileSync(path.join(ICONS_FOLDERS[source], `${icon}.svg`), 'utf8')
      // Remove dimensions from Feather icons
      .replace('width="24" height="24"', '')
      // Clean useless Feather attributes
      .replace(
        / fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-[^"]+">/,
        ' >'
      );
    // Add the new symbol to the sprite
    sprite.add(`symbol-${properties.name || icon}`, svgFile, {
      // Add attributes for accessibility
      symbolAttrs: {
        'aria-label': properties.title,
        role: 'img',
      },
    });
  });
});

// Finally, store the sprite in a file Eleventy will be able to include
fs.writeFileSync(
  'src/_includes/svg-sprite.svg',
  sprite.toString({ inline: true })
);
