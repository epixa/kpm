'use strict';

module.exports = function publish(path) {
  throw new Error('Command "publish" is not implemented');
  /*
  return plugin(path)
    .then(build())
    .then(tar())
    .then(upload())
    .catch(err => console.error(err));
  */
  // is this a valid kibana plugin?
  // build it
  // tar it
  // upload it
};
