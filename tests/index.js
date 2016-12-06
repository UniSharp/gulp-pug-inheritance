'use strict';

const glob = require('glob');
const path = require('path');
const colors = require('colors');

let tests = 0;
let assertions = 0;
let failures = 0;

glob.sync('./tests/**/*Test.js').forEach(file => {
  let pathInfo = path.parse(path.relative('./tests', file));
  let testCase = new (require(`${pathInfo.dir || './'}${pathInfo.name}`));

  tests++;

  console.log(`\n${pathInfo.name}`.bold.cyan);

  testCase.setUp();

  Object.getOwnPropertyNames(Object.getPrototypeOf(testCase)).forEach(method => {
    if (!/^test/.test(method)) {
      return;
    }

    try {
      testCase[method].call(testCase);

      console.log(`  ${'✔'} ${method}`.green);
    } catch (e) {
      failures++;

      console.log(`  ${'✘'} ${method}`.red);
      console.log(`    ${e.name}: ${e.message}`.red);
    }
  });

  assertions += testCase.getAssertions();

  testCase.tearDown();
});

if (failures) {
  console.log(`\nFAILURES!\nTests: ${tests}, Assertions: ${assertions}, Failures: ${failures}`.bgRed.white);

  process.exit(1);
}

console.log(`\nOK (${tests} test, ${assertions} assertions)`.bgGreen.gray);

process.exit();

