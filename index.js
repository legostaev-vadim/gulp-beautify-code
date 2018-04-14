const beautify = require('js-beautify'),
    through2 = require('through2').obj;


module.exports = function(options = {}) {

    return through2(function(file, enc, callback) {

        if (file.isNull()) return callback(null, file);
        if (file.isStream()) return callback(new Error('gulp-beautify-code: Streaming not supported'));

        if (file.extname === '.js') {
            file.contents = Buffer.from(beautify(file.contents.toString(), options));
        } else if (file.extname === '.css') {
            file.contents = Buffer.from(beautify.css(file.contents.toString(), options));
        } else if (file.extname === '.html') {
            file.contents = Buffer.from(beautify.html(file.contents.toString(), options));
        }

        callback(null, file);

    });
}
