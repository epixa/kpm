'use strict';

import { connect } from 'camo';

export default function database(uri) {
  return function *(next) {
    if (!this.app.context.db) {
      this.app.context.db = yield connectToDb(uri);
    }

    this.state.db = this.app.context.db;

    yield next;
  };
};

function connectToDb(uri) {
  return done => {
    connect(uri).then(db => done(null, db));
  };
}
