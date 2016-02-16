'use strict';

import { loadPlugins, loadPlugin, savePlugin } from '../../models/plugin';

export async function list(req, res, next) {
  try {
    res.send(await loadPlugins());
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const { name } = req.params;
    res.send(await loadPlugin(name));
  } catch (err) {
    next(err);
  }
}

export async function upsert(req, res, next) {
  try {
    const { name } = req.params;
    res.send(await savePlugin({ name }));
  } catch (err) {
    next(err);
  }
}
