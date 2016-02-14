'use strict';

import koa from 'koa';
import Jade from 'koa-jade';
import logger from 'koa-logger';
import compress from 'koa-compress';
import { get, put } from 'koa-route';

import database from './database';

import * as plugins from './routes/plugins';
import * as versions from './routes/versions';
import * as archives from './routes/archives';
import * as website from './routes/website';

const app = koa();

// Logger
app.use(logger());


// Database
app.use(database('nedb://memory'));


// Templates
new Jade({
  viewPath: './views',
  debug: true,
  pretty: true,
  compileDebug: true,
  basedir: './views',
  app
});


// Routes
app.use(get('/', website.home));
app.use(get('/plugin/:name', website.plugin));

app.use(get('/api/plugins', plugins.list));
app.use(get('/api/plugins/:name', plugins.get));
app.use(put('/api/plugins/:name', plugins.upsert));

app.use(get('/api/plugins/:name/versions', versions.list));
app.use(get('/api/plugins/:name/:version', versions.get));
app.use(put('/api/plugins/:name/:version', versions.create));

app.use(put('/api/plugins/:name/:version/archive', archives.upload));


// Compress
app.use(compress());


if (!module.parent) {
  app.listen(4000);
  console.log('listening on port 4000');
}

export default app;
