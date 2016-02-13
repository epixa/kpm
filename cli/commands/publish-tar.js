'use strict';

const upsertPlugin = require('../lib/plugin').upsert;
const createVersion = require('../lib/version').create;
const uploadArchive = require('../lib/archive').upload;

module.exports = function publishTar(name, version, path) {
  if (!name) throw new Error('Module "name" is required');
  if (!version) throw new Error('Module "version" is required');
  if (!path) throw new Error('"path" to archive is required');

  return upsertPlugin(name)
    .then(createVersion(version))
    .then(uploadArchive(path));
}
