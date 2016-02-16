'use strict';

import { Document } from 'camo';
import { notFound } from 'boom';
import { promisify } from 'bluebird';
import { last, sortBy } from 'lodash';
import { compare as compareHash, hash as createHash } from 'bcrypt';
import { randomBytes } from 'crypto';

import { Version } from './version';

const compareHashAsync = promisify(compareHash);
const createHashAsync = promisify(createHash);
const randomBytesAsync = promisify(randomBytes);

const work_factor = 11;
const required = true;
const unique = true;

export default class User extends Document {
  constructor() {
    super();

    this.email = { required, type: String, unique };
    this.username = { required, type: String, unique };
    this.hash = { required, type: String };
    this.token = { required, type: String };
  }
}

export async function loadUser(username) {
  const user = await User.loadOne({ username });
  if (!user) throw notFound(`No user named ${username}`);
  return user;
}

export function verifyPassword(user, password) {
  return compareHashAsync(password, user.hash);
}

export function verifyToken(user, token) {
  return compareHashAsync(token, user.token);
}

export async function saveUser({ email, username, password }) {
  let token = await createToken();
  token = await createHashAsync(token, work_factor);
  const hash = await createHashAsync(password, work_factor);
  const user = User.create({ email, username, hash, token });
  return user.save();
}

export async function resetToken(user) {
  const token = await createToken();
  user.token = await createHashAsync(token, work_factor);
  await user.save();
  return token;
}

async function createToken() {
  const token = await randomBytesAsync(52);
  return token.toString('base64');
}
