'use strict';

import Plugin, { loadPlugins, loadPlugin, savePlugin } from '../models/plugin';

export function *list() {
  this.body = yield loadPlugins();
}

export function *get(name) {
  try {
    this.body = yield loadPlugin(name);
  } catch (err) {
    if (!err.isBoom) throw err;
    this.status = err.output.statusCode;
    this.body = err.output.payload;
  }
}

export function *upsert(name) {
  const plugin = Plugin.create({ name });

  this.body = yield savePlugin(plugin);
  this.status = 200;
}
