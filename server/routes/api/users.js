'use strict';

import { notFound, unauthorized } from 'boom';

import { loadUser, resetToken, verifyPassword } from '../../models/user';

export async function token(req, res, next) {
  try {
    const { username } = req.params;
    const { password } = req.body;
    if (!username || !password) throw unauthorized();

    try {
      const user = await loadUser(username);
      const isValid = await verifyPassword(user, password);
      if (!isValid) throw unauthorized();

      const token = await resetToken(user);
      res.send({ username, token });
    } catch (err) {
      if (err instanceof notFound) throw unauthorized();
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

export function create() {
  throw notFound('Not yet implemented');
}
