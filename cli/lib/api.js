'use strict';

const request = require('request');
const curry = require('lodash').curry;
const cbPromiseHandler = require('./util').cbPromiseHandler;

function post(params, fn) {
  return makeRequest(params, request.post, fn);
}

function put(params, fn) {
  return makeRequest(params, request.put, fn);
}

function makeRequest(params, methodFn, fn) {
  // todo: prepend base url
  // todo: inject authorization
  // todo: handle common errors

  if (typeof params !== 'object') {
    params = { url: params };
  }
  params.url = `http://localhost:4000/api${params.url}`;
  params.json = true;

  /*
  params.headers = {
    authorization: authorization()
  };
  */

  return methodFn.call(methodFn, params, fn);
}

module.exports = {
  handler: cbPromiseHandler,
  post,
  put
};
