'use strict';

import { Router } from 'express';
import { initPlugin, loadPlugin, loadPlugins } from '../models/plugin';

const router = Router();

router.get('/', async function(req, res, next) {
  try {
    const title = 'kpm';
    const plugins = (await loadPlugins()).map(initPlugin);
    res.render('home', { title, plugins });
  } catch (err) {
    next(err);
  }
});

router.get('/plugin/:name', async function(req, res, next) {
  try {
    const { name } = req.params;
    const plugin = initPlugin(await loadPlugin(name));
    const title = plugin.name;
    res.render('plugin', { title, plugin });
  } catch (err) {
    next(err);
  }
});

export default router;
