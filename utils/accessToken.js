import { jwt } from "jsonwebtoken";
import { config } from "../config.js";

export function generateAccessToken(user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      config.SECRET,
      {
        expiresIn: config.EXPIRY,
      },
      function (err, token) {
        if (err) {
          return reject(new Error("server_error"));
        }
        return resolve(token);
      }
    );
  });
}

export function verifyAccessToken(accessToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, config.SECRET, function (err, decoded) {
      if (err) {
        return reject(new Error("auth_failure"));
      }
      return resolve({ userId: decoded.userId, email: decoded.email });
    });
  });
}
