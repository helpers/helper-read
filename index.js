/*!
 * helper-read <https://github.com/jonschlinkert/helper-read>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var fs = require('fs');

function read(fp, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  if (typeof cb !== 'function') {
    throw new TypeError('helper-read async expects a callback.');
  }

  if (typeof fp !== 'string') {
    return cb(new TypeError('helper-read async expects fp to be a string.'));
  }
  opts = opts || {};
  opts.encoding = opts.encoding || 'utf8';
  fs.readFile(fp, opts, function (err, contents) {
    if (err) return cb(err);
    cb(null, contents);
  });
}

function readSync(fp, opts) {
  if (typeof fp !== 'string') {
    throw new TypeError('helper-read sync expects fp to be a string.');
  }

  opts = opts || {};
  opts.encoding = opts.encoding || 'utf8';
  return fs.readFileSync(fp, opts);
}

/**
 * Expose `read`
 */

module.exports = read;

/**
 * Expose `read.sync`
 */

module.exports.sync = readSync;
