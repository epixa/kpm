'use strict';

import { Document } from 'camo';
import { notFound } from 'boom';
import { last } from 'lodash';

import { Version } from './version';

export default class Plugin extends Document {
  constructor() {
    super();

    this.name = { type: String, unique: true };
    this.versions = [];
  }
}

export function initPlugin(plugin) {
  return {
    ...plugin,
    latestVersion: last(plugin.versions)
  };
}

export function loadPlugins() {
  return Plugin.loadMany();
}

export async function loadPlugin(name) {
  const plugin = await Plugin.loadOne({ name });
  if (!plugin) throw notFound(`No plugin named ${name}`);
  return plugin;
}

export function savePlugin(data) {
  const { name } = data;
  return Plugin.loadOneAndUpdate({ name }, data, { upsert: true });
}

export function updatePlugin(plugin) {
  return plugin.save();
}
