#!/usr/bin/env node
'use strict'

const meow = require('meow')
const contributors = require('./')

const cli = meow(
  `
  Usage
    $ contributor-faces [<directory>]

  Options
    --exclude, -e   Exclude contributors, glob.
    --limit, -l     Limit the number of contributors (default: 30).

  Examples
    $ contributor-faces --exclude "*-bot"
`,
  {
    alias: {
      e: 'exclude',
      l: 'limit'
    }
  }
)

contributors.update(cli.input[0], cli.flags)
