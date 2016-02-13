'use strict';

const curry = require('lodash').curry;
const api = require('./api');

// creates a new version of the plugin
// must reject if user is not owner
// must reject if request already exists
// must reject if plugin does not exist
function create(version, plugin) {
  const versionUrl = url(version, plugin.url);
  return new Promise((resolve, reject) => {
    api.put(versionUrl, api.handler(resolve, reject));
  })
  .then(response => {
    if (response.statusCode !== 200) {
      throw new Error(`Unexpected status: ${response.statusCode}`);
    }
    return { url: versionUrl };
  });
}

function url(version, pluginUrl) {
  return `${pluginUrl}/${version}`;
}

module.exports = {
  create: curry(create),
  url
};
