const shell = require('shelljs');
// const urls = shell.cat('temp_edit.txt')
// console.log(urls.split("\n"));

const args = process.argv.slice(2);
const argFile = args[0];
const argUrl = args[1];

console.log(argUrl);