const shell = require("shelljs");
const cheerio = require("cheerio");

const args = process.argv.slice(2);
const argFile = args[0];
const argUrl = args[1];

console.log(`argFile is ${argFile}`);
