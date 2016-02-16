'use strict';

import { connect } from 'camo';

import { updateWithArchive } from './models/archive';
import { savePlugin } from './models/plugin';
import { saveUser } from './models/user';
import { saveVersion } from './models/version';

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
  const plugins = ['marvel', 'sense', 'shield', 'timelion']
    .map(user => seedPlugin(storageUrl, user));
  const users = ['courtewing'].map(seedUser);
  return Promise.all([...plugins, ...users]);
}

async function seedPlugin(storageUrl, name) {
  const plugin = await savePlugin({ name });
  const versions = [
    await saveVersion(plugin, { number: '1.2.1' }),
    await saveVersion(plugin, { number: '1.0.0' })
  ];
  return Promise.all(versions.map(async version => {
    const url = `${storageUrl}/${name}/${name}-${version.number}.tgz`;
    await updateWithArchive(plugin, version, url);
  }));
}

function seedUser(username) {
  const rand = Math.floor(Math.random() * 1000);
  const email = `foo+${rand}@example.com`;
  const password = 'notsecure';
  return saveUser({ email, username, password });
}
