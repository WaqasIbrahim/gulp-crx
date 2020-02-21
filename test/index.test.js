
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const File = require('vinyl');

const crx = require('../');

it('it should create a crx', (done) => {
    const stream = crx({
        privateKey: fs.readFileSync(path.resolve(__dirname, './keys/key.pem'), 'utf8'),
        filename: 'extension.crx',
    });

    stream.on('data', (file) => {
        assert.equal(file.path, 'extension.crx');
        assert(file.contents.length > 0);
    });

    stream.on('end', done);

    stream.write(new File({
        cwd: __dirname,
        base: __dirname,
        path: `${__dirname}/extension`,
    }));

    stream.end();
});
