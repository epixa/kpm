'use strict';

import { EmbeddedDocument } from 'camo';
import { conflict, notFound } from 'boom';
import { find } from 'lodash';
import { updatePlugin } from './plugin';

export default class Version extends EmbeddedDocument {
  constructor() {
    super();

    this.number = String;
    this.archive = String;
  }
}

export function loadVersions(plugin) {
  return Promise.resolve(plugin.versions);
}

export async function loadVersion(plugin, number) {
  const versions = await loadVersions(plugin);
  const version = find(versions, { number });
  if (!version) throw notFound(`No version number ${number}`);
  return version;
}

export async function saveVersion(plugin, data) {
  const { number } = data;

  const versions = await loadVersions(plugin);
  let version = find(versions, { number });
  if (version) throw conflict(`Version ${number} already exists`);

  version = Version.create(data);
  plugin.versions.push(version);

  return updatePlugin(plugin).then(() => loadVersion(plugin, number));
}
