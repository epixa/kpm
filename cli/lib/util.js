'use strict';

function cbPromiseHandler(resolve, reject, err, val) {
  if (err) reject(err);
  else resolve(val);
}

module.exports = {
  cbPromiseHandler: curry(cbPromiseHandler)
};
