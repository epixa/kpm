'use strict';

import { retrieveFromS3, updateWithArchive, uploadToS3 } from '../models/archive';
import { loadPlugin } from '../models/plugin';
import { loadVersion } from '../models/version';

export function *get() {
  try {
    this.attachment('marvel-1.0.0.tgz');
    const response = yield retrieveFromS3(stream => this.body = stream);
    this.status = response.statusCode;
  } catch (err) {
    console.error(err);
    this.throw(500, err);
  }
}

export function *upload(name, number) {
  try {
    const plugin = yield loadPlugin(name);
    const version = yield loadVersion(plugin, number);

    const { Location } = yield uploadToS3(this.req);

    yield updateWithArchive(plugin, version, Location);
    this.status = 204;
  } catch (err) {
    console.error(err);
    this.throw(500, err);
  }
}
