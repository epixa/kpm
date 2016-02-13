'use strict';

import { notFound } from 'boom';
import Plugin from '../models/plugin';

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

function loadPlugins() {
  return done => Plugin.loadMany()
    .then(plugins => done(null, plugins))
    .catch(done);
}

function loadPlugin(name) {
  return done => Plugin.loadOne({ name })
    .then(plugin => {
      if (!plugin) throw notFound(`No plugin named ${name}`);
      return plugin;
    })
    .then(plugin => done(null, plugin))
    .catch(done);
}

function savePlugin(plugin) {
  return done => plugin.save()
    .then(plugin => done(null, plugin))
    .catch(done);
}
