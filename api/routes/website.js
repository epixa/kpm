'use strict';

import { loadPlugin, loadPlugins } from '../models/plugin';

export function *home() {
  const title = 'kpm';
  const plugins = yield loadPlugins();
  this.render('home', { title, plugins });
}

export function *plugin(name) {
  const plugin = yield loadPlugin(name);
  const title = plugin.name;
  this.render('plugin', { title, plugin });
}
