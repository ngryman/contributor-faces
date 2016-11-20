'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = _interopDefault(require('path'));
var gh = _interopDefault(require('gh-got'));
var readmeFilename = _interopDefault(require('readme-filename'));
var replace = _interopDefault(require('replace-in-file'));
var mm = _interopDefault(require('micromatch'));

function getRepo(baton) {
  const pkg = require(path.resolve(baton.dir, 'package.json'))

  baton.repo = pkg.repository.replace(/https?:\/\/github\.com\//, '')
  return baton
}

function fetch(baton) {
  return gh(`repos/${baton.repo}/contributors`).then(res => {
    baton.contributors = res.body
    return baton
  })
}

function filter(baton) {
  if (!baton.exclude) return baton

  const isExcluded = mm.matcher(baton.exclude)
  baton.contributors = baton.contributors.filter(contrib => !isExcluded(contrib.login))
  return baton
}

function html(baton) {
  baton.html = baton.contributors.reduce((html, contributor) => {
    const line = `
      <a href="${contributor.html_url}">
        <img src="${contributor.avatar_url}" title="${contributor.login}" width="80" height="80">
      </a>`
    html += line.replace(/\n/gm, '').replace(/\s{2,}/g, '') + '\n'
    return html
  }, '')
  return baton
}

function update(baton) {
  return readmeFilename(baton.dir)
    .then(filename => new Promise((resolve, reject) => {
      replace({
        files: path.resolve(baton.dir, filename),
        replace: /\[\/\/\]: contributor-faces(?:(?:\n.*)+\[\/\/\]: contributor-faces)?/,
        with: `[//]: contributor-faces\n${baton.html}[//]: contributor-faces`
      }, err => {
        /* istanbul ignore if  */
        if (err) return reject(err)
        baton.filename = filename
        resolve(baton)
      })
    }))
}

function end(prop) {
  return baton => baton[prop]
}

function core(dir, opts) {
  opts = opts || {}
  opts.dir = dir || '.'
  return Promise.resolve(opts)
    .then(getRepo)
    .then(fetch)
    .then(filter)
}

/* -------------------------------------------------------------------------- */

function contributors(dir, opts) {
  return core(dir, opts).then(end('contributors'))
}

contributors.html = function(dir, opts) {
  return core(dir, opts).then(html).then(end('html'))
}

contributors.update = function(dir, opts) {
  return core(dir, opts).then(html).then(update).then(end('filename'))
}

module.exports = contributors;