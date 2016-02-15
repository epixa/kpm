'use strict';

import { connect } from 'camo';

export default function database(uri) {
  return async function (req, res, next) {
    if (!req.app.locals.db) {
      req.app.locals.db = await connect(uri);
    }
    next();
  };
};
