const yaml = require('js-yaml');
const fs = require('fs');

let jsonObject
try {
    jsonObject = yaml.load(fs.readFileSync('./i18n/i18n.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

let messageLangMap = {};

for(var key in jsonObject){
  for(var lang in jsonObject[key]){ 
    messageLangMap[lang] = messageLangMap[lang]||{}
    messageLangMap[lang][key] = jsonObject[key][lang]; 
  }
}

for(var key in messageLangMap){ 
  fs.writeFileSync('./src/locales/' + key + '.json', JSON.stringify(messageLangMap[key]));
} 