'use strict'

const path = require('path')
const gh = require('gh-got')
const readmeFilename = require('readme-filename')
const replace = require('replace-in-file')

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
        replace: /\[\/\/\]: contributor-avatars(?:(?:\n.*)+\[\/\/\]: contributor-avatars)?/,
        with: `[//]: contributor-avatars\n${baton.html}[//]: contributor-avatars`
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

/* -------------------------------------------------------------------------- */

function core(dir) {
  return Promise.resolve({ dir: dir || '.' })
    .then(getRepo)
    .then(fetch)
}

module.exports = function(dir) {
  return core(dir).then(end('contributors'))
}

module.exports.html = function(dir) {
  return core(dir).then(html).then(end('html'))
}

module.exports.update = function(dir) {
  return core(dir).then(html).then(update).then(end('filename'))
}
