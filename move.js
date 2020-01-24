#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const insertLine = require('insert-line');

if (process.argv.length <= 2) {
  console.log("Usage: " + __filename + " path/to/directory");
  process.exit(-1);
}

var rootDir = process.argv[2];

fs.readdirSync(rootDir).forEach(year => {
  if (year.match(/^[0-9]{4}$/)) {
    fs.readdirSync(path.join(rootDir, year)).forEach(month => {
      if (month.match(/^[0-9]{2}$/)) {
        let fullMonthDir = path.join(rootDir, year, month);
        fs.readdirSync(fullMonthDir).forEach(contentDir => {
          if (parts = contentDir.match(/^([0-9]{2})-(.*)$/)) {
            console.log(parts);
            let day = parts[1];
            let contentSlug = parts[2];
            let fullDayDir = path.join(fullMonthDir, day);
            let fileDest = path.join(fullDayDir, contentSlug, 'index.md');
            if (!fs.existsSync(fullDayDir)) {
              fs.mkdirSync(fullDayDir);
            }
            fs.renameSync(path.join(fullMonthDir, contentDir), path.join(fullDayDir, contentSlug));
            fs.renameSync(path.join(fullDayDir, contentSlug, `${year}-${month}-${day}-${contentSlug}.md`), fileDest);
            insertLine(fileDest).contentSync(`date: ${year}-${month}-${day} 12:00:00 +02:00`).at(3);
          }
        });
      }
    });
  }
});
