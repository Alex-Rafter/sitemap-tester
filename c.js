const shell = require('shelljs')
const cheerio = require('cheerio')

const args = process.argv.slice(2)
const argFile = args[0]
const argUrl = args[1]

const doc = shell.cat(argFile)
const $ = cheerio.load(doc.stdout, null, false)

// Create base obj and arrs for insertion into obj later
const obj = {
  url: argUrl
}
const images = []
const meta = []

// Loop through all the images and add to JSON object and JSON stringify
$('img').each((index, item) => {
  const altAttr = $(item).attr('alt')
  if (!altAttr || typeof altAttr.match(/\s+/) === null) {
    images.push({
      html: $.html(item),
      src: $(item).attr('src')
    })
  }
})

$('meta').each((index, item) => {
  const contentAttr = $(item).attr('content')
  if (!contentAttr && contentAttr !== undefined) {
    meta.push({
      html: $.html(item)
    })
  }
})

// Conditionals
if (meta.length > 0) obj.meta = meta
if (images.length > 0) obj.images = images
if (!meta.length > 0 || !images.length > 0) delete obj.url

if (meta.length > 0 || images.length > 0) {
  const json = JSON.parse(shell.cat('dev-checks.json'))
  json.push(obj)
  const data = new shell.ShellString(JSON.stringify(json))
  data.to('dev-checks.json')
}
