#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const FOLDERS = [
  './src/assets/avatars/',
  './src/assets/icons/',
  './src/assets/logos/',
  './src/assets/opengraph/',
];
const README_FILENAME = 'README.md';
const NB_IMAGES_PER_LINE = 5;
const IMAGE_WIDTH = 150;

let nbImages;
let mdContent;

FOLDERS.forEach((folder) => {
  console.log(`
Processing ${folder}…`);
  nbImages = 0;
  mdContent = `---
permalink: false
---

<table><tr>`;
  fs.readdirSync(folder).forEach((image) => {
    if (image !== README_FILENAME) {
      console.log(` ${image}`);
      if (!(nbImages % NB_IMAGES_PER_LINE)) {
        if (nbImages > 0) {
          mdContent += `
</tr>`;
        }
        mdContent += `
<tr>`;
      }
      nbImages++;
      mdContent += `
<td valign="bottom">
<img src="./${image}" width="${IMAGE_WIDTH}"><br>
${image}
</td>
`;
    }
  });
  while (nbImages % NB_IMAGES_PER_LINE) {
    mdContent += `
<td></td>`;
    nbImages++;
  }
  mdContent += `
</tr></table>`;

  fs.writeFileSync(path.join(folder, README_FILENAME), mdContent);
});
