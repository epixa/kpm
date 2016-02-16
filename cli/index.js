'use strict';

const login = require('./commands/login');
const publish = require('./commands/publish');
const addUser = require('./commands/add-user');

const args = process.argv.slice(2);

const command = args.shift();
if (!command) {
  throw new Error('You must specify a command');
}

switch (command) {
  case 'login':
    login().catch(handleError);
    break;
  case 'publish':
    publish.apply(null, args).catch(handleError);
    break;
  case 'add-user':
    addUser.apply(null, args).catch(handleError);
    break;
  default:
    throw new Error(`Unknown command: ${command}`);
}

function handleError(err) {
  console.error(err.stack);
}
