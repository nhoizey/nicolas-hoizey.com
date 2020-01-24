#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " path/to/directory");
  process.exit(-1);
}

var rootDir = process.argv[2];

fs.readdirSync(rootDir).forEach(yearDir => {
  if (yearDir.match(/^[0-9]{4}$/)) {
    fs.readdirSync(path.join(rootDir, yearDir)).forEach(monthDir => {
      if (monthDir.match(/^[0-9]{2}$/)) {
        let fullMonthDir = path.join(rootDir, yearDir, monthDir);
        fs.readdirSync(fullMonthDir).forEach(contentDir => {
          if (parts = contentDir.match(/^([0-9]{2})-(.*)$/)) {
            console.log(parts);
            let dayDir = parts[1];
            let contentSlug = parts[2];
            let fullDayDir = path.join(fullMonthDir, dayDir);
            if (!fs.existsSync(fullDayDir)) {
              fs.mkdirSync(fullDayDir);
            }
            fs.renameSync(path.join(fullMonthDir, contentDir), path.join(fullDayDir, contentSlug));
            fs.renameSync(path.join(fullDayDir, contentSlug, `${yearDir}-${monthDir}-${dayDir}-${contentSlug}.md`), path.join(fullDayDir, contentSlug, 'index.md'));
          }
        });
      }
    });
  }
});
