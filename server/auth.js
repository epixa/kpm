'use strict';

import { badRequest, forbidden, notFound, unauthorized } from 'boom';

import { loadUser, verifyToken } from './models/user';

export default function authorization() {
  return async function (req, res, next) {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw unauthorized();

      const [ type, auth ] = authorization.split(' ', 2);
      if (type.toLowerCase() !== 'custom') {
        throw badRequest(`Unsupported authorization type: ${type}`);
      }

      const [ username, token ] = decodeAuthPair(auth);

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
