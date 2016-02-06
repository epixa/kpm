'use strict';

const curry = require('lodash').curry;
const api = require('./api');
const cbPromiseHandler = require('./util').cbPromiseHandler;

function create(user) {
  return new Promise((resolve, reject) => {
    api.put(url(user.username), cbPromiseHandler);
  });
}

function url(username) {
  return `/users/${username}`;
}

module.exports = {
  create: curry(create)
};
