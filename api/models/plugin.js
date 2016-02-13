'use strict';

import { Document } from 'camo';
import { notFound } from 'boom';

import { Version } from './version';

export default class Plugin extends Document {
  constructor() {
    super();

    this.name = { type: String, unique: true };
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

export function savePlugin(data) {
  const { name } = data;
  return done => Plugin.loadOneAndUpdate({ name }, data, { upsert: true })
    .then(plugin => done(null, plugin))
    .catch(done);
}
