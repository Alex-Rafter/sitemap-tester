const shell = require('shelljs')

const doc = shell.cat('dev-checks.json')
const data = JSON.parse(doc.stdout)
const titleSpacer = '*****************'
console.log(`${titleSpacer}\nDEV CHECKS REPORT\n${titleSpacer}\n`)
console.log(`${data.length} problems pages found`)

data.forEach((obj, index) => {
  introMsg(obj, index)
  if (obj.meta) metaMsg(obj)
  if (obj.images) imagesMsg(obj)
})

function introMsg (obj, index) {
  const spacer = '------------------------------------------------'
  console.log(`\n${spacer}\nPAGE ${index + 1}: ${obj.url}\n${spacer}\n`)
}

function metaMsg (obj) {
  console.log('MISSING META :')
  renderData(obj.meta)
}

function imagesMsg (obj) {
  console.log('\nIMAGES WITHOUT ALT TAGS :')
  renderData(obj.images, 'src')
}

function renderData (data, renderType = 'html') {
  const render = (renderType === 'html') ? 'html' : 'src'
  data.forEach(item => {
    console.log(item[render])
  })
}
