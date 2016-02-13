'use strict';

import { EmbeddedDocument } from 'camo';
import { notFound } from 'boom';
import { find } from 'lodash';

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
