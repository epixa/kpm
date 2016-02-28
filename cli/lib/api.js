'use strict';

const homedir = require('os').homedir;
const resolve = require('path').resolve;
const request = require('request');
const curry = require('lodash').curry;
const retrieve = require('./credentials').retrieve;
const cbPromiseHandler = require('./util').cbPromiseHandler;

const kpmrcPath = resolve(homedir(), '.kpmrc'); // todo: move this to start

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

  const auth = retrieve(kpmrcPath);
  if (auth) {
    params.headers = {
      authorization: `Custom ${auth}`
    };
  }

  return methodFn.call(methodFn, params, fn);
}

module.exports = {
  handler: cbPromiseHandler,
  post,
  put
};
