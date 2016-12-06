'use strict';

const assert = require('assert');

class TestCase {
  constructor() {
    this.assertions = 0;
  }

  setUp() {
  }

  tearDown() {
  }

  getAssertions() {
    return this.assertions;
  }

  assertEquals() {
    this.assertions++;

    assert.deepEqual.apply(assert, arguments);
  }
}

module.exports = TestCase;
