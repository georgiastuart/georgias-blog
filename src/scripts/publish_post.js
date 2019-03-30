const fs = require('fs');
const YAML = require('yaml');
const moment = require('moment');

let blogListPath = 'src/assets/blog/blog-list.json';

let blogList = JSON.parse(fs.readFileSync(blogListPath).toString());

let argv = require('minimist')(process.argv.slice(2));
console.dir(argv);

blogEntry = blogList.find((entry) => {
  if (entry.slug === argv._[0]) {
    return entry
  }
});

console.dir(blogEntry);
blogEntry.draft = false;
blogEntry.publishedAt = moment().format();

fs.writeFileSync(blogListPath, JSON.stringify(blogList, null, 2));

let createdAt = new Date(blogEntry.createdAt);
console.dir(createdAt);
let mdPath = 'src/assets/blog/' + createdAt.getFullYear() + '/' + ('0' + (createdAt.getMonth() + 1)).slice(-2) + '/'
  + ('0' + createdAt.getDate()).slice(-2);

fs.copyFileSync(mdPath + '/' + blogEntry.slug + '.md', mdPath + '/' + blogEntry.slug + '.backup');

let blogContent = fs.readFileSync(mdPath + '/' + blogEntry.slug + '.md').toString().split("----------")[1];
delete blogEntry.excerpt;
fs.writeFileSync(mdPath + '/' + blogEntry.slug + '.md', YAML.stringify(blogEntry) + '----------' + blogContent);

