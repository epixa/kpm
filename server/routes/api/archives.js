'use strict';

import { updateWithArchive, uploadToS3 } from '../../models/archive';
import { loadPlugin } from '../../models/plugin';
import { loadVersion } from '../../models/version';

export async function upload(req, res, next) {
  try {
    const { name, number } = req.params;

    const plugin = await loadPlugin(name);
    // todo: assert that current user is the owner of this plugin
    const version = await loadVersion(plugin, number);

    const s3Config = req.app.locals.config.s3;
    //const { Location } = await uploadToS3(s3Config, plugin, version, req);
    const Location = 'https://example.com/wat.tgz';

    await updateWithArchive(plugin, version, Location);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
}
