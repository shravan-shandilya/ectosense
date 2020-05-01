"use strict";
import validator from "validator";
import { errors } from "../src/errors.js";

export function validateAccessToken() {
  return validator.isJWT(token);
}

export function validate(object) {
  return function (req, _res, next) {
    switch (object) {
      case "signup":
        if (
          validator.isAlpha(req.body.fname) &&
          validator.isAlpha(req.body.sname) &&
          validator.isEmail(req.body.email) &&
          validator.isAlphanumeric(req.body.password)
        ) {
          return next();
        } else {
          throw errors.InvalidParameters;
        }

      case "login":
        if (
          validator.isEmail(req.body.email) &&
          validator.isAlphanumeric(req.body.password)
        ) {
          return next();
        } else {
          throw errors.InvalidParameters;
        }

      case "jwt": {
        if (req.headers.authorization == null)
          throw errors.AuthenticationTokenMissing;
        if (validator.isJWT(req.headers.authorization.split(" ")[1])) {
          return next();
        } else {
          throw errors.AuthenticationTokenMalformed;
        }
      }
    }
  };
}
