"use strict";
import * as uuid from "uuid";
import * as userModel from "../models/user.js";
import { createPasswordHash, verifyPasswordHash } from "../../utils/hash.js";
import { createAccessToken } from "../../utils/accessToken.js";

export async function handleSignup(req, res, next) {
  let user = {
    _id: uuid.v4(),
    email: req.body.email,
    fname: req.body.fname,
    sname: req.body.sname,
    passwordHash: await createPasswordHash(req.body.password),
    timeCreated: new Date(),
    role: "patient",
  };

  userModel
    .isEmailAvailable(user.email)
    .then((availability) => {
      if (!availability) {
        throw new Error("email_not_available");
      }
      return userModel.createUser(user);
    })
    .then((user) => {
      return createAccessToken(user);
    })
    .then((user) => {
      res.send({ status: true, token: user.token });
    })
    .catch((err) => {
      return next(err);
    });
}

export function handleLogin(req, res, next) {
  let user = null;
  userModel
    .getUserByEmail(req.body.email)
    .then((_user) => {
      user = _user;
      if (user == null) {
        throw new Error("invalid_credentials");
      }
      return verifyPasswordHash(req.body.password, user.passwordHash);
    })
    .then((verificationResult) => {
      if (!verificationResult) {
        throw new Error("invalid_credentials");
      }
      return createAccessToken(user);
    })
    .then((user) => {
      res.send({ status: true, token: user.token });
    })
    .catch((err) => {
      return next(err);
    });
}
