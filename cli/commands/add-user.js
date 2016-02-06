'use strict';

const prompt = require('prompt');
const user = require('../lib/user');
const credentials = require('../lib/credentials');
const cbPromiseHandler = require('../lib/util').cbPromiseHandler;

const required = true;
const hidden = true;
const schema = {
  email: { required },
  username: { required, pattern: /^[a-zA-Z0-9]+$/ },
  password: { hidden }
};

module.exports = function addUser() {
  prompt.start();

  return promptForUserInfo(schema)
    .then(user.create())
    .then(credentials.store('~/.kpmrc'))
}

function promptForUserInfo(schema) {
  return new Promise((resolve, reject) => {
    prompt.get(schema, cbPromiseHandler(resolve, reject));
  });
}
