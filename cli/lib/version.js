'use strict';

const curry = require('lodash').curry;
const api = require('./api');

// creates a new version of the plugin
// must reject if user is not owner
// must reject if request already exists
// must reject if plugin does not exist
function create(version, plugin) {
  return new Promise((resolve, reject) => {
    api.put(url(version, plugin.url), api.handler(resolve, reject));
  });
}

function url(version, pluginUrl) {
  return `${pluginUrl}/${version}`;
}

module.exports = {
  create: curry(create),
  url
};
