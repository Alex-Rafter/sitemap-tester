const shell = require('shelljs');
const urls = shell.cat('temp_edit.txt')
console.log(urls.split("\n"));