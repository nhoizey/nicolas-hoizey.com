const svgstore = require('svgstore');
const fs = require('fs');
const path = require('path');

const ICONS_FOLDER = 'node_modules/feather-icons/dist/icons/';
const ICONS_LIST = {
  calendar: 'Date',
  info: 'Info',
  link: 'Link',
  wifi: 'Online',
  'wifi-off': 'Offline',
  search: 'Search',
  tag: 'Tag',
  twitter: 'Twitter',
  'message-circle': 'Webmention',
};

let sprite = svgstore({
  svgAttrs: { style: 'display: none;', 'aria-hidden': 'true' },
  copyAttrs: ['width', 'height'],
});

Object.entries(ICONS_LIST).forEach(([icon, title]) => {
  console.log(`${icon}.svg -> ${title}`);
  const svgFile = fs
    .readFileSync(path.join(ICONS_FOLDER, `${icon}.svg`), 'utf8')
    .replace(' width="24" height="24"', ' width="1em" height="1em"')
    .replace(
      / fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-[^"]+">/,
      ` ><title id="${icon}-icon">${title}</title>`
    );
  sprite.add(`symbol-${icon}`, svgFile, {
    symbolAttrs: {
      'aria-labelledby': `${icon}-icon`,
      role: 'img',
    },
  });
});
fs.writeFileSync(
  'src/_includes/svg-sprite.svg',
  sprite.toString({ inline: true })
);
