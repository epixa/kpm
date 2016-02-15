'use strict';

import { connect } from 'camo';

import { savePlugin } from './models/plugin';
import { saveVersion } from './models/version';
import { updateWithArchive } from './models/archive';

export default function setupDatabase(app) {
  const uri = app.locals.config.databaseUri;
  const db = connect(uri).catch(err => {
    console.error(err);
    throw err;
  });

  return async function (req, res, next) {
    try {
      if (!req.app.locals.db) {
        req.app.locals.db = await db;
        if (req.app.get('env') === 'development') {
          const { storageUrl } = req.app.locals.config;
          await dev(storageUrl);
        }
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

// seed dev data
async function dev(storageUrl) {
  return Promise.all(['marvel', 'sense', 'shield', 'timelion'].map(async name => {
    const plugin = await savePlugin({ name });
    const versions = [
      await saveVersion(plugin, { number: '1.2.1' }),
      await saveVersion(plugin, { number: '1.0.0' })
    ];
    return Promise.all(versions.map(async version => {
      const url = `${storageUrl}/${name}/${name}-${version.number}.tgz`;
      await updateWithArchive(plugin, version, url);
    }));
  }));
}
