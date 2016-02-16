'use strict';

import { Document } from 'camo';
import { notFound } from 'boom';
import { last, sortBy } from 'lodash';
import { compare as compareVersions } from 'semver';

import User from './user';
import Version from './version';

const required = true;
const unique = true;

export default class Plugin extends Document {
  constructor() {
    super();

    this.name = { required, type: String, unique };
    //this.owner = { required, type: User };
    this.versions = [ Version ];
  }
}

export function initPlugin(plugin) {
  return {
    ...plugin,
    latestVersion: last(plugin.versions)
  };
}

export function loadPlugins() {
  return Plugin.loadMany().then(plugins => sortBy(plugins, 'name'));
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
  // todo: make sure owner isn't being modified
  plugin.versions.sort((v1, v2) => compareVersions(v1.number, v2.number));
  return plugin.save();
}
