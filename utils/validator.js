"use strict";
import validator from "validator";

export function validateAccessToken() {
  return validator.isJWT(token);
}

export function validate(path) {
  return function (req, _res, next) {
    switch (path) {
      case "signup":
        if (
          validator.isAlpha(req.body.fname) &&
          validator.isAlpha(req.body.sname) &&
          validator.isEmail(req.body.email) &&
          validator.isAlphanumeric(req.body.password)
        ) {
          return next();
        } else {
          throw new Error("invalid_parameters");
        }

      case "login":
        if (
          validator.isEmail(req.body.email) &&
          validator.isAlphanumeric(req.body.password)
        ) {
          return next();
        } else {
          throw new Error("invalid_parameters");
        }
    }
  };
}
