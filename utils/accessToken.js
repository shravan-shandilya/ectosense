import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function createAccessToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      config.ACCESS_TOKEN.SECRET,
      {
        expiresIn: config.ACCESS_TOKEN.EXPIRY,
      },
      function (err, token) {
        if (err) {
          return reject(err);
        }
        user["token"] = token;
        return resolve(user);
      }
    );
  });
}

export function verifyAccessToken(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.ACCESS_TOKEN.SECRET, function (
      err,
      decoded
    ) {
      if (err) {
        return reject(err);
      }
      return resolve({ userId: decoded.userId, email: decoded.email });
    });
  });
}
