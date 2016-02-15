'use strict';

import { Router } from 'express';
import * as plugins from './api/plugins';
import * as versions from './api/versions';
import * as archives from './api/archives';

const router = Router();


router.route('/plugins')
  .get(plugins.list);

router.route('/plugins/:name')
  .get(plugins.get)
  .put(plugins.upsert);

router.route('/plugins/:name/versions')
  .get(versions.list);

router.route('/plugins/:name/:number')
  .get(versions.get)
  .put(versions.create);

router.route('/plugins/:name/:number/archive')
  .put(archives.upload);


export default router;
