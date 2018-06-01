'use strict'

const execa = require('execa')
const fs = require('fs')
const path = require('path')
const program = require('commander')
const readPkg = require('read-pkg-up')

const getReadmeFile = require('./get-readme-file')
const { version } = require('../package')

const main = module.exports = async (argv) => {
  program
    .version(version)
    .usage('update-markdown-jsdoc [options]')
    .option('-r, --readme <filename>', 'markdown file to update (defaults to local readme)')
    .option('-f, --file <filename>', 'main source entrypoint (defaults to local package "main")')
    .option('-s, --section <string>', 'name of markdown section to update', (s) => s, 'api')
    .option('-S, --shallow', 'enable shallow mode')
    .parse(argv)

  const pkg = await readPkg()
  if (!pkg) {
    console.error('unable to find valid package.json')
    return program.outputHelp()
  }

  const root = path.dirname(pkg.path)
  const main = program.file || pkg.pkg.main
  const file = path.join(root, main)
  if (!file || !fs.existsSync(file)) {
    console.error('unable to find valid main entrypoint in package.json')
    return program.outputHelp()
  }

  const readme = program.readme || await getReadmeFile(root)
  if (!readme || !fs.existsSync(readme)) {
    console.error('unable to find valid readme markdown file')
    return program.outputHelp()
  }

  await execa('documentation', [
    'readme',
    '--readme-file', readme,
    '-q',
    '-g',
    '-s', program.section,
    (program.shallow && '--shallow'),
    file
  ].filter(Boolean))
}

main(process.argv)
