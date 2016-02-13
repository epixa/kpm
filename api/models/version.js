'use strict';

import { EmbeddedDocument } from 'camo';

class Version extends EmbeddedDocument {
  constructor() {
    super();

    this.number = String;
    this.archive = String;
  }
}
