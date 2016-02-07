'use strict';

const request = require('request');
const curry = require('lodash').curry;
const cbPromiseHandler = require('./util').cbPromiseHandler;

function put() {
  // todo: prepend base url
  // todo: inject authorization
  // todo: handle common errors
  return request.put.apply(request, arguments);
}

module.exports = {
  handler: cbPromiseHandler
  put
};
