'use strict';

export default function views(app, path) {
  app.set('views', path);
  app.set('view engine', 'jade');
  app.locals.pretty = app.locals.config.prettyTemplates;
};
