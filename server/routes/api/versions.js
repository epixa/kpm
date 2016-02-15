'use strict';

import { loadPlugin, savePlugin } from '../../models/plugin';
import { loadVersions, loadVersion, saveVersion } from '../../models/version';


export async function list(req, res) {
  try {
    const { name } = req.params;
    const plugin = await loadPlugin(name);
    res.send(await loadVersions(plugin));
  } catch (err) {
    if (!err.isBoom) throw err;
    res.status(err.output.statusCode).send(err.output.payload);
  }
}

export async function get(req, res) {
  try {
    const { name, number } = req.params;
    const plugin = await loadPlugin(name);
    res.send(await loadVersion(plugin, number));
  } catch (err) {
    if (!err.isBoom) throw err;
    res.status(err.output.statusCode).send(err.output.payload);
  }
}

export async function create(req, res) {
  try {
    const { name, number } = req.params;
    const plugin = await loadPlugin(name);
    res.send(await saveVersion(plugin, { number }));
  } catch (err) {
    if (!err.isBoom) throw err;
    res.status(err.output.statusCode).send(err.output.payload);
  }
}
