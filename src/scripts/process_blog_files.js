const YAML = require('yaml');
const glob = require('glob');
const resolve = require('path').resolve;
const fs = require('fs');

const fileList = glob.sync('src/assets/blog/**/**/**/*.md');
const fmSep = '----------';
const excerptSep = '<!--more-->';

console.log(fileList);

let textList = [];
let frontMatterList = []
fileList.forEach((filename) => {
  const articleString = fs.readFileSync(resolve(filename)).toString();
  let frontMatter = articleString.split(fmSep)[0];
  frontMatter = YAML.parse(frontMatter);
  frontMatter.slug = filename.split('/').slice(-1)[0].replace('.md', '');

  const excerpt = articleString.split(fmSep)[1].split(excerptSep)[0];
  frontMatter.excerpt = excerpt.replace(/^\n\n|\n\n$/g, '');
  frontMatterList.push(frontMatter);
});

console.log(frontMatterList);
var json = JSON.stringify(frontMatterList, null, 2);
fs.writeFileSync(resolve('src/assets/blog/blog-list.json'), json);
