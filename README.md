# gulp-crx
Create a CRX file for Chrome or Opera using gulp

> Inspired from [gulp-crx](https://github.com/PavelVanecek/gulp-crx), Still works but is inactive? Uses old version of [crx](https://www.npmjs.com/package/crx) and the generated crx files don't work in Opera.

## Installation
Using yarn
```bash
yarn add @waqasibrahim/gulp-crx --dev
```
Using npm
```bash
npm install @waqasibrahim/gulp-crx --save-dev
```

## Usage
```javascript
const crx = require('@waqasibrahim/gulp-crx');
const { name, version } = require('./package');

const sourceDir = 'extension';
const distDir = 'dist';

gulp.task('crx', () => gulp.src(sourceDir)
    .pipe(crx({
        privateKey: fs.readFileSync('./keys/key.pem', 'utf8'),
        filename: `${name}_${version}.crx`,
    }))
    .pipe(gulp.dest(distDir)));
```

## Keys
You can create a key and extension ID for the manifest:
```bash
openssl genrsa 2048 | openssl pkcs8 -topk8 -nocrypt -out key.pem
```

Key:
```bash
openssl rsa -in key.pem -pubout -outform DER | openssl base64 -A
```
Extension ID:
```bash
openssl rsa -in key.pem -pubout -outform DER | shasum -a 256 | head -c32 | tr 0-9a-f a-p
```
