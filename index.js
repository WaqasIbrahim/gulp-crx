
const through = require('through2');
const File = require('vinyl');
const ChromeExtension = require('crx');


module.exports = (options) => {
    function transform(file, _, callback) {
        const self = this;

        const crx = new ChromeExtension({
            privateKey: options.privateKey,
        });

        crx.load(file.path)
            .then((crxFile) => crxFile.pack())
            .then((crxBuffer) => {
                self.push(new File({
                    path: options.filename,
                    contents: crxBuffer,
                }));

                callback();
            }).catch((error) => {
                callback(error);
            });
    }

    return through.obj(transform);
};
