'use strict';

import { access } from 'fs';
import { join as pathJoin } from 'path';
import { cloneDeep, merge } from 'lodash';

import kpm from './config/kpm';

export default function config(path, env) {
  let config = Promise.resolve(kpm).then(cloneDeep);
  if (env === 'development') {
    config = config.then(kpm => mergeDevConfig(kpm, path));
  }

  return async function (req, res, next) {
    try {
      if (!req.app.locals.config) {
        req.app.locals.config = await config;
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

// merge in dev config if it exists
function mergeDevConfig(config, path) {
  return new Promise((resolve, reject) => {
    const devConfig = pathJoin(path, 'kpm.dev.js');
    access(devConfig, err => {
      if (!err) merge(config, require(devConfig).default);
      resolve(config);
    });
  });
}
