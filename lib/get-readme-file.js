'use strict'

const fs = require('fs')
const path = require('path')

module.exports = (dir) => {
  const readmeFilenames = [
    'README',
    'README.markdown',
    'README.md',
    'README.txt',
    'Readme.md',
    'readme.markdown',
    'readme.md',
    'readme.txt'
  ]

  const readmeFile = fs.readdirSync(dir).find((filename) => {
    return readmeFilenames.indexOf(filename) >= 0
  })

  if (readmeFile) {
    return path.join(fs.realpathSync(dir), readmeFile)
  }
}
