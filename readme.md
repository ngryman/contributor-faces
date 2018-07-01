# contributor-faces

> Put your contributors faces in your readme.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/contributor-faces.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/contributor-faces
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/contributor-faces.svg
[codecov-url]: https://codecov.io/github/ngryman/contributor-faces


**contributor-faces** lets you display a list of your contributors in your `readme`. It also
allows you to list contributors by contributions in `javascript` or `html`.

## Install

```sh
npm install --save contributor-faces
```

## Usage

### API

```javascript
import contributors from 'contributor-faces'

// get an array of contributors
contributors().then(...)

// get contributors list as html
contributors.render().then(...)

// update contributors list in readme
contributors.update().then(...)

// exclude some contributors
contributors('.', { exclude: '*-bot' }).then(...)
```

### CLI

```sh
contributor-faces [<directory>]
```

## Update your readme

To keep your contributor list up-to-date, your have to specify a placeholder for
`contributor-faces`:

```markdown
[//]: contributor-faces
```

Then whenever you update your `readme`, the placeholder will get updated like this:

```markdown
[//]: contributor-faces
<a href="https://github.com/ngryman"><img src="https://avatars.githubusercontent.com/u/892048?v=3" title="ngryman" width="80" height="80"></a>
[//]: contributor-faces
```

## FAQ

### Why `[//]: contributor-faces`?

`markdown` does not officially support non visible text or comments. A known workaround is to use a
`link label` to do so. `contributor-faces` uses a specific `link label` to process your `readme`:

  - `//` is only decorative and means it's a comment
  - `contributor-faces` serves as the placeholder identifier.

## Contributors

[//]: contributor-faces

<a href="https://github.com/ngryman"><img src="https://avatars.githubusercontent.com/u/892048?v=3" title="ngryman" width="80" height="80"></a>

[//]: contributor-faces


## License

MIT © [Nicolas Gryman](http://ngryman.sh)
