'use strict';

const fs = require('fs');
const path = require('path');
const gutil = require('gulp-util');
const through = require('through2');
const PugInheritance = require('@unisharp/pug-inheritance');

module.exports = (pattern) => {
  let pugInheritance = new PugInheritance(pattern);

  return through.obj(function (chunk, enc, callback) {
    pugInheritance.getInheritance(path.relative(chunk.cwd, chunk.path)).forEach(file => {
      this.push(new gutil.File({
        cwd: chunk.cwd,
        path: file,
        base: chunk.base,
        contents: new Buffer(fs.readFileSync(file))
      }));
    });

    callback();
  });
};
