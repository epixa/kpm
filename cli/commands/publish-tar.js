'use strict';

const plugin = require('../lib/plugin');
const version = require('../lib/version');
const archive = require('../lib/archive');

module.exports = function publishTar(name, version, path) {
  if (!name) throw new Error('Module "name" is required');
  if (!version) throw new Error('Module "version" is required');
  if (!path) throw new Error('"path" to archive is required');

  return plugin.upsert(name)
    .then(version.create(version))
    .then(archive.upload(path));
}
