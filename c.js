const shell = require('shelljs');
const cheerio = require('cheerio');

const arg = process.argv[2];
const urlsAsString = shell.cat(arg);
const arrOfUrls = urlsAsString.split("\n")
const arrOfObjs = []

arrOfUrls.forEach(url => {
    const obj = {}    
    shell.exec(`curl -s ${url} > tmp.html`, (err, stdout, stderr) => {})
    const doc = shell.cat('tmp.html');
    const $ = cheerio.load(doc.stdout, null, false);

// Loop through all the images and add to JSON object and JSON stringify
const images = [];
$('img').each((index, item) => {
    const altAttr = $(item).attr('alt') 
    if (!$(item).attr('alt') || ! altAttr.match(/\s+/).length === null) {
        images.push({
            html: $.html(item),
            src: $(item).attr('src')
        });
    }
})

if (images.length > 0) {
    obj.url = url;
    obj.images = images;
    arrOfObjs.push(obj);
}

    
// console.log(`There are ${$('img').length} images without alt attributes`);
// console.log(JSON.stringify(images));
shell.echo(JSON.stringify(arrOfObjs)).to('dev-checks_3.json');

});



