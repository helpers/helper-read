var read = require('./');
var Template = require('template');
var template = new Template();

/**
 * Register an engine
 */

template.engine('foo', require('engine-lodash'));

/**
 * Register the helper
 */

template.asyncHelper('read', read);

/**
 * Add some templates
 */

template.page('abc.foo', '<%= read("fixtures/a.txt") %>');
template.page('xyz.foo', '<%= read("fixtures/b.txt") %>');

/**
 * Render the templates
 */

template.render('abc.foo', function (err, contents) {
  if (err) console.log(err);
  console.log(contents);
  //=> 'AAA'
});

template.render('xyz.foo', function (err, contents) {
  if (err) console.log(err);
  console.log(contents);
  //=> 'BBB'
});
