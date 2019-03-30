const YAML = require('yaml');
const glob = require('glob');
const resolve = require('path').resolve;
const fs = require('fs');

const fileList = glob.sync('src/assets/blog/**/**/**/*.md');
const fmSep = '----------';
const excerptSep = '<!--more-->';

console.log(fileList);

let textList = [];
let frontMatterList = [];
let tagList = {};
fileList.forEach((filename) => {
  const articleString = fs.readFileSync(resolve(filename)).toString();
  let frontMatter = articleString.split(fmSep)[0];
  frontMatter = YAML.parse(frontMatter);
  frontMatter.slug = filename.split('/').slice(-1)[0].replace('.md', '');

  frontMatter.tags.forEach((tag) => tagList[tag] = tagList[tag] + 1 || 1);
  const excerpt = articleString.split(fmSep)[1].split(excerptSep)[0];
  frontMatter.excerpt = excerpt.replace(/^\n\n|\n\n$/g, '');
  createdAt = new Date(frontMatter.createdAt);
  frontMatter.url = createdAt.getFullYear() + '/' + ('0' + (createdAt.getMonth() + 1)).slice(-2)
    + '/' + ('0' + createdAt.getDate()).slice(-2);
  frontMatterList.push(frontMatter);
});

console.log(frontMatterList);
console.log(tagList);
var json = JSON.stringify(frontMatterList, null, 2);
fs.writeFileSync(resolve('src/assets/blog/blog-list.json'), json);
fs.writeFileSync('src/assets/blog/tag-list.json', JSON.stringify(tagList));
