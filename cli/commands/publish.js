'use strict';

const tmp = require('tmp');
const targz = require('tar.gz');
const child_process = require('child_process');
const resolvePath = require('path').resolve;

const upsertPlugin = require('../lib/plugin').upsert;
const createVersion = require('../lib/version').create;
const uploadFile = require('../lib/archive').uploadFile;

module.exports = function publish(path) {
  if (!path) throw new Error('"path" to module is required');
  path = resolvePath(path);

  const pkg = manifest(path);
  // todo: is this a valid kibana plugin?

  const cwd = tmp.dirSync({ unsafeCleanup: true }).name;
  const npmPath = resolvePath(__dirname, '..', 'node_modules', '.bin', 'npm');

  child_process.execSync(`${npmPath} install --production ${path}`, { cwd });

  const source = resolvePath(cwd, 'node_modules', pkg.name);
  const destination = resolvePath(cwd, `${pkg.name}-${pkg.version}.tgz`);

  return targz().compress(source, destination)
    .then(() => upsertPlugin(pkg.name))
    .then(createVersion(pkg.version))
    .then(uploadFile(destination));
};

function manifest(path) {
  return require(`${path}/package.json`);
}
