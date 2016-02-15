'use strict';

export default function views() {
  return function (req, res, next) {
    res.locals.pretty = req.app.locals.config.prettyTemplates;
    next();
  }
};
