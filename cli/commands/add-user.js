'use strict';

const user = require('../lib/user');
const credentials = require('../lib/credentials');

module.exports = function addUser() {
  return user.promptForUserInfo()
    .then(user.create())
    .then(credentials.store('~/.kpmrc'));
}
