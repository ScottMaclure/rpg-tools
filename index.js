const puppeteer = require('puppeteer')

const sleep = (millis) => {
  return new Promise(resolve => setTimeout(resolve, millis))
}

const savePdf = async (browser, baseUrl, characterClass, counter) => {
  const page = await browser.newPage()
  await page.goto(baseUrl + characterClass)
  await page.pdf({
    path: './pdfs/' + characterClass + '-' + Date.now() + '.pdf',
    format: 'A5'
  })
}

(async () => {

  const baseUrl = 'https://campaignwiki.org/halberdsnhelmets/random/en?rules=halberds-n-helmets&class='
  const maxCharacters = 10
  const delay = 3000 // 3 seconds
  const characterClasses = [
    'dwarf',
    'elf',
    'cleric',
    'fighter',
    'halfling',
    'magic-user',
    'thief'
  ]
  const browser = await puppeteer.launch()

  for (const characterClass of characterClasses) {
    console.log('Fetching ' + maxCharacters + ' ' + characterClass + 's...')
    for (i = 1; i < maxCharacters; i++) {
      console.log('Requesting ' + characterClass + ' #' + i)
      await savePdf(browser, baseUrl, characterClass, i)
      await sleep(delay)
    }
  }
  
  await browser.close()
})();