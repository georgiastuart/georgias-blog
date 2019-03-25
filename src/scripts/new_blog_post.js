/*
Creates a new blog post template in the directory of the created date
 */

const fs = require('fs');
const YAML = require('yaml');

const date = new Date();

function createDir(path) {
  if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

let filepath = 'src/assets/blog/'+ date.getFullYear();
createDir(filepath);

filepath += '/' + ('0' + (date.getMonth() + 1)).slice(-2);
createDir(filepath);

filepath += '/' + ('0' + date.getDate()).slice(-2);
createDir(filepath);

const config = YAML.parse(fs.readFileSync('src/scripts/script_config.yaml').toString());

let template = '';
config.headerFields.forEach((field) => {
  if (field === 'createdAt') {
    template += field + ': ' + JSON.stringify(date) + '\n';
  } else {
    template += field + ':\n';
  }
});
template += '\n' + config.frontmatterSep + '\n\n\n' + config.excerptSep;
console.log(template);

fs.writeFileSync(filepath + '/new-blog-post.md', template);
