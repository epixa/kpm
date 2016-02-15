'use strict';

import { connect } from 'camo';

import { savePlugin } from './models/plugin';
import { saveVersion } from './models/version';
import { updateWithArchive } from './models/archive';

export default function database(uri) {
  const db = connect(uri);

  return async function (req, res, next) {
    try {
      if (!req.app.locals.db) {
        if (req.app.get('env') === 'development') {
          await dev();
        }
        req.app.locals.db = await db;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

// seed dev data
async function dev() {
  return Promise.all(['marvel', 'sense', 'shield', 'timelion'].map(async name => {
    const plugin = await savePlugin({ name });
    const versions = [
      await saveVersion(plugin, { number: '1.0.0' }),
      await saveVersion(plugin, { number: '1.2.1' })
    ];
    return Promise.all(versions.map(async version => {
      const url = `https://www.example/${name}/${name}-${version.number}.tgz`;
      await updateWithArchive(plugin, version, url);
    }));
  }));
}