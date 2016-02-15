'use strict';

import { cloneDeep, merge } from 'lodash';

import kpm from './config/kpm';

export default function setupConfig(path, env) {
  const config = cloneDeep(kpm);
  if (env === 'development') {
    mergeDevConfig(config, path);
  }
  return config;
};

// merge in dev config if it exists
function mergeDevConfig(config, path) {
  try {
    const devConfig = require(`${path}/kpm.dev.js`).default;
    merge(config, devConfig);
  } catch (err) {
    console.log('No dev config found. Using default config.');
  }
  return config;
}
