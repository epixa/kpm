'use strict';

import { Document } from 'camo';
import { notFound } from 'boom';

import { Version } from './version';

export default class Plugin extends Document {
  constructor() {
    super();

    this.name = String;
    this.versions = [];
  }
}

export function loadPlugins() {
  return done => Plugin.loadMany()
    .then(plugins => done(null, plugins))
    .catch(done);
}

export function loadPlugin(name) {
  return done => Plugin.loadOne({ name })
    .then(plugin => {
      if (!plugin) throw notFound(`No plugin named ${name}`);
      return plugin;
    })
    .then(plugin => done(null, plugin))
    .catch(done);
}

export function savePlugin(plugin) {
  return done => plugin.save()
    .then(plugin => done(null, plugin))
    .catch(done);
}
