# update-markdown-jsdoc

> Updates a markdown document section with jsdoc documentation.

[![NPM](https://img.shields.io/npm/v/update-markdown-jsdoc.svg)](https://www.npmjs.com/package/update-markdown-jsdoc) [![Build Status](https://travis-ci.com/transitive-bullshit/update-markdown-jsdoc.svg?branch=master)](https://travis-ci.com/transitive-bullshit/update-markdown-jsdoc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

This CLI allows you to quickly generate and update quality readme JSDoc documentation.

Here is an [example](https://github.com/transitive-bullshit/puppeteer-github) of the generated docs. Note that the `API` section is auto-generated, whereas the rest of the readme is editable like normal.

## Install

```bash
npm install -g update-markdown-jsdoc
```

## Usage

```bash
  Usage: update-markdown-jsdoc [options]

  Options:

    -V, --version           output the version number
    -f, --file <filename>   markdown file to update (defaults to local readme)
    -s, --section <string>  name of markdown section to update (default: api)
    -h, --help              output usage information
```

## Related

-   [update-markdown-usage](https://github.com/transitive-bullshit/update-markdown-usage) - Same as this module but for CLI programs instead of jsdoc libraries.
-   [documentation.js](https://github.com/documentationjs/documentation) - JSDoc documentation generator which this module is based on.
-   [jsdoc](http://usejsdoc.org/) - JSDoc documentation standard.

## License

MIT © [Travis Fischer](https://github-cli.com/transitive-bullshit)
