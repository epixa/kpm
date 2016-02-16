'use strict';

import { loadPlugin, savePlugin } from '../../models/plugin';
import { loadVersions, loadVersion, saveVersion } from '../../models/version';


export async function list(req, res, next) {
  try {
    const { name } = req.params;
    const plugin = await loadPlugin(name);
    res.send(await loadVersions(plugin));
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const { name, number } = req.params;
    const plugin = await loadPlugin(name);
    res.send(await loadVersion(plugin, number));
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const { name, number } = req.params;
    const plugin = await loadPlugin(name);
    res.send(await saveVersion(plugin, { number }));
  } catch (err) {
    next(err);
  }
}
