'use strict';

import { updateWithArchive, uploadToS3 } from '../models/archive';
import { loadPlugin } from '../models/plugin';
import { loadVersion } from '../models/version';

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
