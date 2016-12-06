# Gulp Pug Inheritance

[![Build Status](https://travis-ci.org/UniSharp/gulp-pug-inheritance.svg?branch=master)](https://travis-ci.org/UniSharp/gulp-pug-inheritance)

Only build affected files when modify a [Pug](https://github.com/pugjs/pug) file.

## Installation

### Via npm

```bash
npm install @unisharp/gulp-pug-inheritance --save
```

### Via yarn

```bash
yarn add @unisharp/gulp-pug-inheritance
```

## Usage

```javascript
'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const pugInheritance = require('@unisharp/gulp-pug-inheritance');

gulp.tack('watch-pug', () {
    return gulp.watch('resources/pug/**/*.pug', e => {
        gulp.src(e.path, { base: 'resources/pug' })
            .pipe(pugInheritance('resources/pug/**/*.pug'))
            .pipe(pug({ pretty: true }))
            .pipe(gulp.dest('resources/views'));
    });
});
```
