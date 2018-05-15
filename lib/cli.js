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
    .usage('update-markdown-usage [options]')
    .option('-f, --file <filename>', 'markdown file to update (defaults to local readme)')
    .option('-s, --section <string>', 'name of markdown section to update', (s) => s, 'api')
    .option('-w, --write', 'write result to markdown file (defaults to stdout)')
    .parse(argv)

  const pkg = await readPkg()
  if (!pkg) return program.outputHelp()

  const root = path.dirname(pkg.path)
  const main = path.join(root, pkg.pkg.main)
  if (!fs.existsSync(main)) return program.outputHelp()

  const file = program.file || await getReadmeFile(root)
  if (!file || !fs.existsSync(file)) return program.outputHelp()

  await execa('documentation', [
    'readme',
    '--readme-file', file,
    '-q',
    '-g',
    '-s', program.section,
    main
  ])
}

main(process.argv)
