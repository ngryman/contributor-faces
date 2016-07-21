#!/usr/bin/env node
'use strict'

const meow = require('meow')
const contributors = require('./')

const cli = meow(`
  Usage
    $ contributor-avatars [<directory>]
`)

contributors.update(cli.input[0])
