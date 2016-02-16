'use strict';

import { Router } from 'express';
import { json } from 'body-parser';
import authorization from '../auth';
import * as archives from './api/archives';
import * as plugins from './api/plugins';
import * as users from './api/users';
import * as versions from './api/versions';

const router = Router();

router.route('/users/:username')
  .put(users.create);

router.route('/users/:username/token')
  .post(json(), users.token);

// Require authorization
router.use(authorization());

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
