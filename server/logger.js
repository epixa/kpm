'use strict';

import logger from 'morgan';

export default function setupLogger(app) {
  const logFormat = app.locals.config.logFormat;
  return logger(logFormat);
};
