"use strict";
import { verifyAccessToken } from "../../utils/accessToken.js";
import { getUserPermissions } from "../models/user.js";
import { errors } from "../errors.js";

export function authenticate(req, res, next) {
  verifyAccessToken(req.headers.authorization.split(" ")[1])
    .then((user) => {
      if (user.userId) {
        req.userId = user.userId;
        req.email = user.email;
        return next();
      } else {
        throw errors.AuthenticationFailed;
      }
    })
    .catch((_err) => {
      return next(errors.AuthenticationFailed);
    });
}

export function authorize(permissionsNeeded) {
  return function (req, _res, next) {
    getUserPermissions(req.userId)
      .then((userPermission) => {
        if (userPermission & permissionsNeeded) {
          return next();
        } else {
          throw errors.AuthorizationFailed;
        }
      })
      .catch((err) => {
        return next(err);
      });
  };
}
