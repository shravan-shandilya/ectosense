"use strict";
import { verifyAccessToken } from "../../utils/accessToken.js";

export function authenticate(req, res, next) {
  if (validator.validateAccessToken(req.headers.authorization)) {
    verifyAccessToken(req.headers.authorization.split(" ")[1])
      .then((user) => {
        if (user.userId) {
          req.userId = user.userId;
          req.email = user.email;
          return next();
        } else {
          throw new Error("auth_failure");
        }
      })
      .catch(() => {
        return next(new Error("auth_failure"));
      });
  } else {
    return next(new Error("auth_not_present"));
  }
}
