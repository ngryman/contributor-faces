# contributor-avatars

> Put your contributors avatar in your readme.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/contributor-avatars.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/contributor-avatars
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/contributor-avatars.svg
[codecov-url]: https://codecov.io/github/ngryman/contributor-avatars


**contributor-avatars** lets you display a list of your contributors in your `readme`. It also
allows you to list contributors by contributions in `javascript` or `html`.

## Install

```sh
npm install --save contributor-avatars
```

## Usage

### API

```javascript
const contributors = require('contributor-avatars')

// in the current project...

// get an array of contributors
contributors().then(...)

// get contributors list as html
contributors.html().then(...)

// update contributors list in the readme
contributors.update().then(...)
```

### CLI

```sh
contributor-avatars [<directory>]
```

## Update your readme

To keep your contributor list up-to-date, your have to specify a placeholder for
`contributor-avatars`:

```markdown
[//]: contributor-avatars
```

Then whenever you update your `readme`, the placeholder will get updated like this:

```markdown
[//]: contributor-avatars
<a href="https://github.com/ngryman"><img src="https://avatars.githubusercontent.com/u/892048?v=3" title="ngryman" width="80" height="80"></a>
[//]: contributor-avatars
```

## FAQ

### Why `[//]: contributor-avatars`?

`markdown` does not officially support non visible text or comments. A known workaround is to use a
`link label` to do so. `contributor-avatars` uses a specific `link label` to process your `readme`:

  - `//` is only decorative and means it's a comment
  - `contributor-avatars` serves as the placeholder identifier.

## Contributors

[//]: contributor-avatars
<a href="https://github.com/ngryman"><img src="https://avatars.githubusercontent.com/u/892048?v=3" title="ngryman" width="80" height="80"></a>
[//]: contributor-avatars


## License

MIT © [Nicolas Gryman](http://ngryman.sh)
