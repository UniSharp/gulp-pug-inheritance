'use strict';

const gutil = require('gulp-util');
const TestCase = require('./TestCase');
const gulpPugInheritance = require('../src');

class GulpPugInheritanceTest extends TestCase {
  testSingleFile() {
    this.runTest(
      ['tests/fixtures/test-1.pug'],
      'tests/fixtures/test-1.pug'
    );
  }

  testEditInheritance() {
    this.runTest(
      ['tests/fixtures/test-2-2.pug'],
      'tests/fixtures/test-2-2.pug'
    );
  }

  testEditLayout() {
    this.runTest(
      ['tests/fixtures/test-3-1.pug', 'tests/fixtures/test-3-2.pug', 'tests/fixtures/test-3-3.pug'],
      'tests/fixtures/test-3-1.pug'
    );
  }

  testEditIncluded() {
    this.runTest(
      ['tests/fixtures/test-4-3.pug', 'tests/fixtures/test-4-2.pug'],
      'tests/fixtures/test-4-3.pug'
    );
  }

  testNested() {
    this.runTest(
      ['tests/fixtures/test-5/test-5-1.pug', 'tests/fixtures/test-5-2.pug'],
      'tests/fixtures/test-5/test-5-1.pug'
    );
  }

  runTest(expected, file) {
    let files = [];

    gulpPugInheritance('tests/fixtures/**/*.pug')
      .on('data', file => {
        files.push(file.path);
      })
      .write(new gutil.File({ path: file }));

    this.assertEquals(expected, files);
  }
}

module.exports = GulpPugInheritanceTest;
