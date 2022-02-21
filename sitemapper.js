const SitemapGenerator = require('sitemap-generator')
const args = process.argv.slice(2)
const devSiteUrl = args[0]
const spacer = '------------------------------------------------------------'
console.log(`\n${spacer}\nScript is now running using devSiteUrl : ${devSiteUrl}\nThis will take a few minutes to run while it hits each dev site url.\n${spacer}\n\n`)
// create generator
const generator = SitemapGenerator(`${devSiteUrl}`, {
  stripQuerystring: true
})

const crawler = generator.getCrawler()
crawler.respectRobotsTxt = false

generator.on('ignore', (url) => {
  console.log(`Ignored URL: ${url}`)
  // log ignored url
})

// register event listeners
generator.on('done', () => {
  // sitemaps created
})

// start the crawler
generator.start()
