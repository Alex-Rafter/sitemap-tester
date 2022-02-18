const shell = require("shelljs");
const cheerio = require("cheerio");

const args = process.argv.slice(2);
const argFile = args[0];
const argUrl = args[1];

const doc = shell.cat(argFile);
const $ = cheerio.load(doc.stdout, null, false);

// Loop through all the images and add to JSON object and JSON stringify
const obj = {};
const images = [];
const meta = [];
$("img").each((index, item) => {
  const altAttr = $(item).attr("alt");
  if (!altAttr || typeof altAttr.match(/\s+/) === null) {
    images.push({
      html: $.html(item),
      src: $(item).attr("src"),
    });
  }
});

$("meta").each((index, item) => {
  const contentAttr = $(item).attr("content");
  if (!contentAttr && contentAttr !== undefined) {     
    meta.push({
      html: $.html(item),
    });
  }
});

if (meta.length > 0) obj.meta = meta;
if (images.length > 0) obj.images = images;

if (meta.length > 0 || images.length > 0) {
  obj.url = argUrl;
  let json = JSON.parse(shell.cat("dev-checks.json"));
  json.push(obj);
  let data = new shell.ShellString(JSON.stringify(json));
  data.to("dev-checks.json");
}
