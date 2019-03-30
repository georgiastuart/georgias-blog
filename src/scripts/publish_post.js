const fs = require('fs');
const YAML = require('yaml');
const moment = require('moment');

let blogList = JSON.parse(fs.readFileSync('src/assets/blog/blog-list.json').toString());

let argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

blogEntry = blogList.find((entry) => {
  if (entry.slug === argv._[0]) {
    return entry
  }
});

