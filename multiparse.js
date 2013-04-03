module.exports = function () {
  var parse_path = require.resolve('parse');
  delete require.cache[parse_path];
  var parse = require('parse');
  delete require.cache[parse_path];
  return parse;
};