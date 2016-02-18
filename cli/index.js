'use strict';

const publish = require('./commands/publish');
const addUser = require('./commands/add-user');

const args = process.argv.slice(2);

const command = args.shift();
if (!command) {
  throw new Error('You must specify a command');
}

// todo: load credentials if they exist

switch (command) {
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
  console.error(err);
}
