/*!
 * helper-read <https://github.com/jonschlinkert/helper-read>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps:mocha */
var assert = require('assert');
var should = require('should');
var Template = require('template');
var _ = require('lodash');
var read = require('./');
var template;

describe('async', function () {
  it('should read from a filepath:', function (cb) {
    read('fixtures/a.txt', function (err, contents) {
      contents.should.equal('AAA');
    });
    read('fixtures/b.txt', function (err, contents) {
      contents.should.equal('BBB');
      cb();
    });
  });

  it('should work as an async helper:', function (cb) {
    template = new Template();
    template.asyncHelper('read', read);
    template.engine('foo', require('engine-lodash'));
    template.page('abc.foo', '<%= read("fixtures/a.txt") %>');
    template.page('xyz.foo', '<%= read("fixtures/b.txt") %>');

    template.render('abc.foo', function (err, contents) {
      if (err) return cb(err);
      contents.should.equal('AAA');
    });

    template.render('xyz.foo', function (err, contents) {
      if (err) return cb(err);
      contents.should.equal('BBB');
      cb();
    });
  });

  it('should throw an error when the callback is missing:', function (cb) {
    (function () {
      read();
    }).should.throw('helper-read async expects a callback.');
    cb()
  });

  it('should throw an error when the filepath is missing:', function (cb) {
    read(null, function (err, contents) {
      err.should.be.an.object;
      err.message.should.equal('helper-read async expects fp to be a string.');
      cb();
    });
  });
});

describe('async', function () {
  it('should read from a filepath:', function () {
    read.sync('fixtures/a.txt').should.equal('AAA');
    read.sync('fixtures/b.txt').should.equal('BBB');
  });

  it('should work as a helper:', function () {
    var ctx = {read: read.sync};
    _.template('<%= read("fixtures/a.txt") %>')(ctx).should.equal('AAA');
    _.template('<%= read("fixtures/b.txt") %>')(ctx).should.equal('BBB');
  });

  it('should throw an error when the callback is missing:', function () {
    (function () {
      read.sync();
    }).should.throw('helper-read sync expects fp to be a string.');
  });
});

