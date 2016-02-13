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
  return done => done(null, plugin.versions);
}

export function loadVersion(plugin, number) {
  return done => {
    try {
      const version = find(plugin.versions, { number });
      if (!version) throw notFound(`No version number ${number}`);
      done(null, version);
    } catch (err) {
      done(err);
    }
  };
}

export function saveVersion(plugin, data) {
  const { number } = data;
  return done => {
      try {
        let version = find(plugin.versions, { number });
        if (version) throw conflict(`Version ${number} already exists`);

        version = Version.create(data);
        plugin.versions.push(version);

        updatePlugin(plugin)(done);
      } catch (err) {
        done(err);
      }
    }
}
