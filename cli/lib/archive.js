'use strict';

const createReadStream = require('fs').createReadStream;
const curry = require('lodash').curry;
const put = require('./api').put;
const cbPromiseHandler = require('./util').cbPromiseHandler;

// uploads the archive at the path as the plugin version
// must reject if user is not owner
// must reject if archive already exists
// must reject if version does not exist
function uploadFile(path, version) {
  const archiveUrl = url(version.url);
  return new Promise((resolve, reject) => {
    const stream = put(archiveUrl, cbPromiseHandler(resolve, reject));
    createReadStream(path).pipe(stream);
    // todo: pass application/x-gzip ?
  })
  .then(response => {
    if (response.statusCode !== 204) {
      throw new Error(`Unexpected status: ${response.statusCode}`);
    }
    return { url: archiveUrl };
  });
}

function url(versionUrl) {
  return `${versionUrl}/archive`;
}

module.exports = {
  uploadFile: curry(uploadFile),
  url
};
