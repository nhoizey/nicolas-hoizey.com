const svgstore = require('svgstore');
const fs = require('fs');
const path = require('path');

const ICONS_FOLDER = 'src/_assets/icons/';

let sprite = svgstore({
  svgAttrs: { style: 'display: none;', 'aria-hidden': 'true' },
  copyAttrs: ['width', 'height'],
});
fs.readdirSync(ICONS_FOLDER).forEach((icon) => {
  console.log(icon);
  sprite.add(
    `symbol-${path.basename(icon, '.svg')}`,
    fs.readFileSync(path.join(ICONS_FOLDER, icon), 'utf8')
  );
});
fs.writeFileSync(
  'src/_includes/svg-sprite.njk',
  sprite.toString({ inline: true })
);
