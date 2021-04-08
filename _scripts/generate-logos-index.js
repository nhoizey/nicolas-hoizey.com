#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = './src/assets/logos/';
const readmeFile = 'README.md';
let mdContent = '<div style="display: flex; flex-wrap: wrap">';

fs.readdirSync(rootDir).forEach((logo) => {
  if (logo !== readmeFile)
    mdContent = `${mdContent}
<figure>
<img src="./${logo}" style="max-width: 200px">
<figcaption>${logo}</figcaption>
</figure>
`;
});
mdContent = `${mdContent}
</div>`;

fs.writeFileSync(path.join(rootDir, readmeFile), mdContent);
