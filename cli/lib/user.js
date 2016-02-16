'use strict';

const curry = require('lodash').curry;
const prompt = require('prompt');
const api = require('./api');
const cbPromiseHandler = require('./util').cbPromiseHandler;

const required = true;
const hidden = true;
const credentialSchema = {
  username: { required, pattern: /^[a-zA-Z0-9]+$/ },
  password: { required, hidden }
};
const userSchema = Object.assign({
  email: { required }
}, credentialSchema);

function promptAsync(properties) {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.get({ properties }, cbPromiseHandler(resolve, reject));
  });
}

function promptForCredentials() {
  return promptAsync(credentialSchema);
}

function promptForUserInfo() {
  return promptAsync(userSchema);
}

function authenticate(credentials) {
  return new Promise((resolve, reject) => {
    const params = {
      url: url(credentials.username) + '/token',
      body: { password: credentials.password }
    };
    api.post(params, cbPromiseHandler(resolve, reject));
  })
  .then(response => {
    if (response.statusCode !== 200) {
      throw new Error(`Unexpected status: ${response.statusCode}`);
    }
    return response.body;
  });
}

function create(user) {
  return new Promise((resolve, reject) => {
    api.put(url(user.username), cbPromiseHandler(resolve, reject));
  })
  .then(response => {
    if (response.statusCode !== 200) {
      throw new Error(`Unexpected status: ${response.statusCode}`);
    }
    // todo: do this for real
    return user;
  });
}

function url(username) {
  return `/users/${username}`;
}

module.exports = {
  authenticate: curry(authenticate),
  create: curry(create),
  promptForCredentials,
  promptForUserInfo
};
