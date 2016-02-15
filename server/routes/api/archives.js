'use strict';

import { updateWithArchive, uploadToS3 } from '../../models/archive';
import { loadPlugin } from '../../models/plugin';
import { loadVersion } from '../../models/version';

export async function upload(req, res) {
  const { name, number } = req.params;

  const plugin = await loadPlugin(name);
  const version = await loadVersion(plugin, number);

  const s3Config = req.app.locals.config.s3;
  const { Location } = await uploadToS3(s3Config, plugin, version, req);

  await updateWithArchive(plugin, version, Location);

  res.status(204).end();
}
