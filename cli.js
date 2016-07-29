#!/usr/bin/env node
'use strict'

const meow = require('meow')
const contributors = require('./')

const cli = meow(`
  Usage
    $ contributor-faces [<directory>]

  Options
    --exclude, -e   Exclude contributors, glob.

  Examples
    $ contributor-faces --exclude "*-bot"
`, {
  alias: {
    e: 'exclude'
  }
})

contributors.update(cli.input[0], cli.flags)
