'use strict';

const api = require('./api');

// creates the plugin if it does not exist
// must error if plugin exists and current user is not owner
function upsert(name) {
  return new Promise((resolve, reject) => {
    api.put(url(name), api.handler(resolve, reject));
  });
}

function url(name) {
  return `/plugins/${name}`;
}

module.exports = { upsert, url };
