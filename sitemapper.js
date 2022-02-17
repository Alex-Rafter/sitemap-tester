const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('http://psb29112021.dev.cogplatform.co.uk/', {
  stripQuerystring: true,
});

const crawler = generator.getCrawler();
crawler.respectRobotsTxt = false;

generator.on('ignore', (url) => {
  console.log(`Ignored URL: ${url}`);
  // log ignored url
});


// register event listeners
generator.on('done', () => {
  // sitemaps created
});

// start the crawler
generator.start();
