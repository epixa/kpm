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
  const archiveUrl = url(version.url);
  return new Promise((resolve, reject) => {
    const stream = put(archiveUrl, cbPromiseHandler(resolve, reject));
    fs.createReadStream(path).pipe(stream);
  })
  .then(response => {
    if (response.statusCode !== 204) {
      throw new Error(`Unexpected status: ${response.statusCode}`);
    }
    return { url: archiveUrl };
  });
}

function uploadBuffer(buffer, version) {
  const archiveUrl = url(version.url);
  return new Promise((resolve, reject) => {
    const params = {
      url: archiveUrl,
      body: buffer
    };
    // todo: pass application/zip ?
    put(params, cbPromiseHandler(resolve, reject));
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
  upload: curry(upload),
  uploadBuffer: curry(uploadBuffer),
  url
};
