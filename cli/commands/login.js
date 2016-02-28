'use strict';

const homedir = require('os').homedir;
const resolve = require('path').resolve;
const user = require('../lib/user');
const credentials = require('../lib/credentials');

const kpmrcPath = resolve(homedir(), '.kpmrc'); // todo: move this to start

module.exports = function login() {
  return user.promptForCredentials()
    .then(user.authenticate())
    .then(credentials.store(kpmrcPath))
}
