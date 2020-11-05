const svgstore = require('svgstore');
const fs = require('fs');
const path = require('path');

// Where are Feather icons available from the npm package?
const ICONS_FOLDER = 'node_modules/feather-icons/dist/icons/';

// Which icons do I need for the sprite?
// icon filename + title for accessibility
const ICONS_LIST = {
  calendar: 'Date',
  info: 'Info',
  link: 'Link',
  'map-pin': 'Location',
  'message-circle': 'Webmention',
  rss: 'Feeds',
  search: 'Search',
  tag: 'Tag',
  twitter: 'Twitter',
  wifi: 'Online',
  'wifi-off': 'Offline',
};

// Initiate the sprite with svgstore
let sprite = svgstore({
  // Add these attributes to the sprite SVG
  svgAttrs: { style: 'display: none;', 'aria-hidden': 'true' },
  // Copy these attributes from the icon source SVG to the symbol in the sprite
  copyAttrs: ['width', 'height'],
});

// Loop through each icon in the list
Object.entries(ICONS_LIST).forEach(([icon, title]) => {
  // Log the name of the icon and its title to the console
  console.log(`${icon}.svg -> ${title}`);
  const svgFile = fs
    // Load the content of the icon SVG file
    .readFileSync(path.join(ICONS_FOLDER, `${icon}.svg`), 'utf8')
    // Make its dimensions relative to the surounding text
    .replace(' width="24" height="24"', ' width="1em" height="1em"')
    // Add a title for accessibility
    .replace(
      / fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-[^"]+">/,
      ` ><title id="${icon}-icon">${title}</title>`
    );
  // Add the new symbol to the sprite
  sprite.add(`symbol-${icon}`, svgFile, {
    // Add attributes for accessibility
    symbolAttrs: {
      'aria-labelledby': `${icon}-icon`,
      role: 'img',
    },
  });
});
// Finally, store the sprite in a file Eleventy will be able to include
fs.writeFileSync(
  'src/_includes/svg-sprite.svg',
  sprite.toString({ inline: true })
);
