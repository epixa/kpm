'use strict';

const curry = require('lodash').curry;

function cbPromiseHandler(resolve, reject, err, val) {
  if (err) reject(err);
  else resolve(val);
}

function cbPromiseHandler(resolve, reject) {
  return function(err, val) {
    if (err) reject(err);
    else resolve(val);
  }
}


module.exports = { cbPromiseHandler };
