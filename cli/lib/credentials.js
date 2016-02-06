'use strict';

// todo: fix this so it doesn't write a new line every time

const fs = require('fs');
const curry = require('lodash').curry;
const cbPromiseHandler = require('./util').cbPromiseHandler;

function store(path, credentials) {
  const auth = encodedAuthString(credentials.username, credentials.password);
  return new Promise((resolve, reject) => {
    fs.writeFile(path, authLine(auth), cbPromiseHandler);
  });
}

function authLine(auth) {
  return `auth:${auth}\n`;
}

function encodedAuthString(username, password) {
  const auth = authString(credentials.username, credentials.password);
  return new Buffer(auth, 'utf8').toString('base64')
}

function authString(username, password) {
  return `${username}:${password}`;
}

module.exports = {
  store: curry(store)
};
