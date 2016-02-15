'use strict';

import { loadPlugins, loadPlugin, savePlugin } from '../../models/plugin';

export async function list(req, res) {
  res.send(await loadPlugins());
}

export async function get(req, res) {
  try {
    const { name } = req.params;
    res.send(await loadPlugin(name));
  } catch (err) {
    if (!err.isBoom) throw err;
    res.status(err.output.statusCode).send(err.output.payload);
  }
}

export async function upsert(req, res) {
  const { name } = req.params;
  res.send(await savePlugin({ name }));
}
