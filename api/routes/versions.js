'use strict';

import { loadPlugin, savePlugin } from '../models/plugin';
import Version, { loadVersions, loadVersion } from '../models/version';


export function *list(name) {
  try {
    const plugin = yield loadPlugin(name);
    this.body = yield loadVersions(plugin);
  } catch (err) {
    if (!err.isBoom) throw err;
    this.status = err.output.statusCode;
    this.body = err.output.payload;
  }
}

export function *get(name, number) {
  try {
    const plugin = yield loadPlugin(name);
    this.body = yield loadVersion(plugin, number);
  } catch (err) {
    if (!err.isBoom) throw err;
    this.status = err.output.statusCode;
    this.body = err.output.payload;
  }
}

export function *create(name, number) {
  const plugin = yield loadPlugin(name);
  const version = Version.create({ number });

  plugin.versions.push(version);

  yield savePlugin(plugin);

  this.body = version;
  this.status = 200;
}
