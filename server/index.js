'use strict';

import { join as joinPath } from 'path';
import express from 'express';
import compression from 'compression';

import setupConfig from './config';
import setupDatabase from './database';
import setupLogger from './logger';
import setupViews from './views';

import website from './routes/website';
import api from './routes/api';

const app = express();

const fromRoot = (...args) => joinPath(__dirname, ...args);


// Config
app.locals.config = setupConfig(fromRoot('config'), app.get('env'));


// Templates
setupViews(app, fromRoot('views'));
app.use(express.static(fromRoot('views', 'assets')));


// Logger
app.use(setupLogger(app));


// Database
app.use(setupDatabase(app));


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
  app.use(function(error, req, res, next) {
    let status = error.status;
    let message = error.message;
    if (error.isBoom) {
      status = error.output.statusCode;
      message = error.output.payload.message || error.output.payload.error;
    }
    status = status || 500;
    res.status(status);
    res.render('error', { message, error });
    console.error(status, message);
    console.error(error.stack);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(error, req, res, next) {
  let status = error.status;
  let message = error.message;
  if (error.isBoom) {
    status = error.output.statusCode;
    message = error.output.payload.message || error.output.payload.error;
  }
  res.status(status || 500);
  res.render('error', { message, error: {} });
});


export default app;
