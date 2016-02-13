'use strict';

import { loadPlugin, savePlugin } from '../models/plugin';
import { loadVersions, loadVersion, saveVersion } from '../models/version';


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
  try {
    const plugin = yield loadPlugin(name);
    this.body = yield saveVersion(plugin, { number });
    this.status = 200;
  } catch (err) {
    if (!err.isBoom) throw err;
    this.status = err.output.statusCode;
    this.body = err.output.payload;
  }
}
