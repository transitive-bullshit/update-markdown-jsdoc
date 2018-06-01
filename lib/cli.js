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
    .option('-f, --file <filename>', 'markdown file to update (defaults to local readme)')
    .option('-s, --section <string>', 'name of markdown section to update', (s) => s, 'api')
    .option('-S, --shallow', 'enable shallow mode')
    .parse(argv)

  const pkg = await readPkg()
  if (!pkg) {
    console.error('unable to find valid package.json')
    return program.outputHelp()
  }

  const root = path.dirname(pkg.path)
  const main = path.join(root, pkg.pkg.main)
  if (!pkg.pkg.main || !fs.existsSync(main)) {
    console.error('unable to find valid main entrypoint in package.json')
    return program.outputHelp()
  }

  const file = program.file || await getReadmeFile(root)
  if (!file || !fs.existsSync(file)) {
    console.error('unable to find valid readme markdown file')
    return program.outputHelp()
  }

  await execa('documentation', [
    'readme',
    '--readme-file', file,
    '-q',
    '-g',
    '-s', program.section,
    (program.shallow && '--shallow'),
    main
  ].filter(Boolean))
}

main(process.argv)
