/**
 * Download http://character.totalpartykill.ca/lotfp/text/
 * Check first line for class name
 * If in whitelist, save to output/lotfp-$className-$timestamp.txt
 * Do until we have N characters generated.
 */

const http = require('http')
const fs = require('fs')
const path = require('path')
const process = require('process')

const CHARGEN_URL = 'http://character.totalpartykill.ca/lotfp/text/'

const getArgs = () => {
  var ArgumentParser = require('argparse').ArgumentParser
  var parser = new ArgumentParser({
    version: '0.0.1',
    addHelp: true,
    description: 'LotFP Character Generator Saver'
  })
  parser.addArgument([ '-n', '--number' ], { help: 'number of characters to generate, default 100', defaultValue: 100 })
  parser.addArgument([ '-c', '--classes' ], { help: 'classes to save, default=cleric,fighter,magic-user,specialist', defaultValue: 'cleric,fighter,magic-user,specialist' })
  parser.addArgument([ '-o', '--output-dir' ], { help: 'location to save files, eg ./output', defaultValue: './output' })
  var args = parser.parseArgs()
  console.dir(args)
  return args
}

const getCharacterClass = (data) => {
  return data.split('\n')[0].trim().split(' ')[1].toLowerCase()
}

const getCharacter = () => {
  return new Promise((resolve, reject) => {
    http.get(CHARGEN_URL, (resp) => {
      let data = ''
      // A chunk of data has been received.
      resp.on('data', (chunk) => {
          data += chunk;
      })
      resp.on('end', () => {
          resolve(data)
      })
    }).on('error', (err) => {
        reject(err)
    })
  })
}

const writeCharacter = (charText, charClass, outputDir) => {
  let fileName = ['lotfp', charClass, Date.now()].join('-') +  '.txt'
  let outputPath = path.join(outputDir, fileName)
  console.log('outputPath:', outputPath)
  process.exit('testing')
  return new Promise((resolve, reject) => {
      fs.writeFile(outputPath, charText, function(err) {
          if(err) {
            reject(err)
          }
          resolve('Wrote char to ', outputPath)
      })
  })
}

(async () => {
  args = getArgs()
  classes = args.classes.split(',')
  let outputDir = path.resolve(args.output_dir)
  console.log('classes:', classes, 'outputDir:', outputDir)

  for (let i = 1; i <= args.number; i++) {
    console.log('Generating character #', i)
    try {
        let charText = await getCharacter()
        let charClass = getCharacterClass(charText)
        if (!args.classes.includes(charClass)) {
            console.log('Invalid class', charClass, 'getting another.')
            i-- // get another one
            continue
        }
        console.log('Valid charClass:', charClass)
        let filePath = await writeCharacter(charText, charClass, outputDir)
        console.log('Wrote char to ', filePath)
    } catch (e) {
        console.error(e)
    }
  }
})()