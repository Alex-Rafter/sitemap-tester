const SitemapGenerator = require('sitemap-generator')
const args = process.argv.slice(2)
const devSiteUrl = args[0]

console.log(`devSiteUrl is ${devSiteUrl}`)

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
