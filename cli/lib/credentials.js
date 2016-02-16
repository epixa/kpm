'use strict';

const fs = require('fs');
const EOL = require('os').EOL;
const curry = require('lodash').curry;
const cbPromiseHandler = require('./util').cbPromiseHandler;

function store(path, credentials) {
  const auth = encodedAuthString(credentials.username, credentials.token);

  let kpmrc;
  try {
    const contents = fs.readFileSync(path);
    kpmrc = contents ? JSON.parse(contents) : {};
  } catch (err) {
    kpmrc = {};
  }

  kpmrc.auth = auth;

  return fs.writeFileSync(path, JSON.stringify(kpmrc, null, 2) + EOL);
}

function encodedAuthString(username, token) {
  const auth = authString(username, token);
  return new Buffer(auth, 'utf8').toString('base64')
}

function authString(username, token) {
  return `${username}:${token}`;
}

module.exports = {
  store: curry(store)
};
