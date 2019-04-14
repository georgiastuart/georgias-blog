const YAML = require('yaml');
const fs = require('fs');

const publicationString = fs.readFileSync('src/assets/cv/publications/publications.yaml').toString();
const parsedPublications =  YAML.parse(publicationString);

fs.writeFileSync('src/assets/cv/publications/publications.json', JSON.stringify(parsedPublications));
