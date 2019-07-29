import path from 'path'
import gh from 'gh-got'
import readmeFilename from 'readme-filename'
import replace from 'replace-in-file'
import mm from 'micromatch'

function getRepo(baton) {
  const pkg = require(path.resolve(baton.dir, 'package.json'))
  const repo = pkg.repository && (pkg.repository.url || pkg.repository)

  if (!repo) {
    throw new Error(`${path.join(baton.dir, 'package.json')}: repository is not set.`)
  }
  baton.repo = repo.replace(/https?:\/\/[^\/]+\//, '').replace('.git', '')
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
  baton.contributors = baton.contributors.filter(
    contrib => !isExcluded(contrib.login))
  return baton
}

function html(baton) {
  baton.html = baton.contributors.reduce((html, contributor) => {
    /* eslint-disable */
    const line = `
      <a href="${contributor.html_url}">
        <img src="${contributor.avatar_url}" title="${contributor.login}" width="80" height="80">
      </a>`
    /* eslint-enable */
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
        // eslint-disable-next-line
        from: /\[\/\/\]: contributor-faces(?:(?:\n.*)+\[\/\/\]: contributor-faces)?/,
        to: `[//]: contributor-faces\n${baton.html}\n[//]: contributor-faces`
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

/* ────────────────────────────────────────────────────────────────────────── */

function contributors(dir, opts) {
  return core(dir, opts).then(end('contributors'))
}

contributors.html = function(dir, opts) {
  return core(dir, opts).then(html).then(end('html'))
}

contributors.update = function(dir, opts) {
  return core(dir, opts).then(html).then(update).then(end('filename'))
}

export default contributors
