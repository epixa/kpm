'use strict';

import { Router } from 'express';
import { loadPlugin, loadPlugins } from '../models/plugin';

const router = Router();

router.get('/', async function(req, res) {
  const title = 'kpm';
  const plugins = await loadPlugins();
  res.render('home', { title, plugins });
});

router.get('/plugin/:name', async function(req, res) {
  const { name } = req.params;
  const plugin = await loadPlugin(name);
  const title = plugin.name;
  res.render('plugin', { title, plugin });
});

export default router;
