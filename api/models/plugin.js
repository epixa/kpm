'use strict';

import { Document } from 'camo';

import { Version } from './version';

export default class Plugin extends Document {
  constructor() {
    super();

    this.name = String;
    this.versions = [];
  }
}
