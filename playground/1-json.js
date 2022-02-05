const fs = require('fs');

const dataBuffer = fs.readFileSync('./1-json.json');
let dataJSON = dataBuffer.toString();

const data = JSON.parse(dataJSON);
data.name = 'Albert';
data.age = 32;

dataJSON = JSON.stringify(data);

fs.writeFileSync('./1-json.json', dataJSON);
