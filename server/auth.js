'use strict';

import { forbidden, notFound, unauthorized } from 'boom';

import { loadUser, verifyToken } from './models/user';

export default function authorization() {
  return async function (req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw unauthorized();

      const [ username, token ] = decodeAuthPair(authorization);

      try {
        const user = await loadUser(username);
        const isValid = await verifyToken(user, token);
        if (!isValid) throw forbidden();

        req.user = user;
      } catch (err) {
        if (err instanceof notFound) throw forbidden();
        throw err;
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

function decodeAuthPair(authorization) {
  return new Buffer(authorization, 'base64').toString().split(':');
}
