"use strict";
import bcrypt from "bcrypt";
import { config } from "../config.js";

export function createPasswordHash(password) {
  return bcrypt.hash(password, config.APP.SALT_ROUNDS);
}

export function verifyPasswordHash(password, hash) {
  return bcrypt.compare(password, hash);
}
