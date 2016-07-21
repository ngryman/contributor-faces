#!/usr/bin/env node
'use strict'

const meow = require('meow')
const contributors = require('./')

const cli = meow(`
  Usage
    $ contributor-faces [<directory>]
`)

contributors.update(cli.input[0])
