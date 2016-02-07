'use strict';

const fs = require('fs');
const curry = require('lodash').curry;
const put = require('./api').put;
const cbPromiseHandler = require('./util').cbPromiseHandler;

// uploads the archive at the path as the plugin version
// must reject if user is not owner
// must reject if archive already exists
// must reject if version does not exist
function upload(path, version) {
  return new Promise((resolve, reject) => {
    const stream = put(url(version.url), cbPromiseHandler(resolve, reject));
    fs.createReadStream(path).pipe(stream);
  });
}

function url(versionUrl) {
  return `${versionUrl}/archive`;
}

module.exports = {
  upload: curry(upload),
  url
};
