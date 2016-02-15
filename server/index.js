'use strict';

import { join as joinPath } from 'path';
import express from 'express';
import compression from 'compression';

import database from './database';
import setupConfig from './config';
import setupLogger from './logger';
import setupViews from './views';

import website from './routes/website';
import api from './routes/api';

const app = express();


// Config
app.locals.config = setupConfig(joinPath(__dirname, 'config'), app.get('env'));


// Templates
setupViews(app, joinPath(__dirname, 'views'));


// Logger
app.use(setupLogger(app));


// Database
app.use(database('nedb://memory'));


// Routes
app.use('/', website);
app.use('/api', api);


// Compress
app.use(compression());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


export default app;
