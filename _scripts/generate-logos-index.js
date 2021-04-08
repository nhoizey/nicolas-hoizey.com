#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = './src/assets/logos/';
const README_FILENAME = 'README.md';
const NB_IMAGES_PER_LINE = 4;
let nbImages = 0;
let mdContent = '<table><tr>';

fs.readdirSync(ROOT_DIR).forEach((image) => {
  if (image !== README_FILENAME) {
    if (!(nbImages % NB_IMAGES_PER_LINE)) {
      mdContent = `${mdContent}
      </tr>
      <tr>`;
    }
    nbImages++;
    mdContent = `${mdContent}
<td valign="bottom">
<img src="./${image}" width="200"><br>
${image}
</td>
  `;
  }
});
mdContent = `${mdContent}
</tr></table>`;

fs.writeFileSync(path.join(ROOT_DIR, README_FILENAME), mdContent);
