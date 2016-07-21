/*eslint no-sync: 0*/

import test from 'ava'
import fs from 'fs'
import path from 'path'
import contributors from './'

test('list contributors', async t => {
  const contribs = await contributors('fixtures')
  t.true(Array.isArray(contribs))
})

test.serial('use current directory by default', async t => {
  process.chdir('fixtures')
  const contribs = await contributors()
  t.true(Array.isArray(contribs))
  process.chdir(__dirname)
})

test('list contributors as html', async t => {
  const html = await contributors.html('fixtures')
  t.regex(html, /<a href="https:\/\/github.com\/baxterthehacker">/)
  t.regex(html, /<img src=".*" title="baxterthehacker" width="80" height="80">/)
})

test('update a virgin readme', async t => {
  const filename = path.join('fixtures', 'readme.md')
  const oldReadme = fs.readFileSync(filename, 'utf8')

  await contributors.update(path.dirname(filename))

  const readme = fs.readFileSync(filename, 'utf8')
  const expected = fs.readFileSync(filename.replace('.md', '-expected.md'), 'utf8')
  t.is(readme, expected)

  fs.writeFileSync(filename, oldReadme)
})

test('update a readme with an existing contributors list', async t => {
  const filename = path.join('fixtures', 'used', 'readme.md')
  const oldReadme = fs.readFileSync(filename, 'utf8')

  await contributors.update(path.dirname(filename))

  const readme = fs.readFileSync(filename, 'utf8')
  const expected = fs.readFileSync(filename.replace('.md', '-expected.md'), 'utf8')
  t.is(readme, expected)

  fs.writeFileSync(filename, oldReadme)
})

test('throw an error if readme is not present', async t => {
  const filename = path.join('fixtures', 'no-readme', 'readme.md')

  await t.throws(contributors.update(path.dirname(filename)))
})
