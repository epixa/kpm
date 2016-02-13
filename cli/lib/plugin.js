'use strict';

const api = require('./api');

// creates the plugin if it does not exist
// must error if plugin exists and current user is not owner
function upsert(name) {
  const pluginUrl = url(name);
  return new Promise((resolve, reject) => {
    api.put(pluginUrl, api.handler(resolve, reject));
  })
  .then(response => {
    if (response.statusCode !== 200) {
      throw new Error(`Unexpected status: ${response.statusCode}`);
    }
    return { url: pluginUrl };
  });
}

function url(name) {
  return `/plugins/${name}`;
}

module.exports = { upsert, url };
