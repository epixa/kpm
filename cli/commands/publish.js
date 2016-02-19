'use strict';

const os = require('os');
const child_process = require('child_process');
const glob = require('glob');
const JSZip = require('jszip');
const joinPath = require('path').join;
const resolvePath = require('path').resolve;
const readFileSync = require('fs').readFileSync;

const upsertPlugin = require('../lib/plugin').upsert;
const createVersion = require('../lib/version').create;
const uploadBuffer = require('../lib/archive').uploadBuffer;

module.exports = function publish(path) {
  if (!path) throw new Error('"path" to module is required');
  path = resolvePath(path);

  const pkg = manifest(path);
  // todo: is this a valid kibana plugin?

  child_process.execSync(`${__dirname}/../node_modules/.bin/npm install --production ${path}`, { cwd: os.tmpdir() });

  const files = packageFiles(`${os.tmpdir()}/node_modules/${pkg.name}`);

  // todo: be better, clean up after yourself, use tmp

  const zip = new JSZip();
  const folder = zip.folder(pkg.name);
  addFiles(path, files, folder);
  const buffer = zip.generate({
    type: 'nodebuffer',
    platform: process.platform
  });

  return upsertPlugin(pkg.name)
    .then(createVersion(pkg.version))
    .then(uploadBuffer(buffer));
};

function manifest(path) {
  return require(`${path}/package.json`);
}

function packageFiles(path) {
  const cwd = path;
  const nodir = true;
  return glob.sync('**/*', { cwd, nodir });
}

function addFiles(cwd, files, zip) {
  files.forEach(file => {
    const path = joinPath(cwd, file);
    const content = readFileSync(path);
    zip.file(file, content);
  });
}
