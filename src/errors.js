"use strict";
import logger from "../utils/logger.js";

const MODULE = "[Errors]";

export class APIError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

export const errors = {
  NotFoundError: new APIError("requested resource not found", 404),
  AuthenticationTokenMissing: new APIError("authentication token missing", 401),
  AuthenticationTokenMalformed: new APIError(
    "authentication token malformed",
    401
  ),
  AuthenticationFailed: new APIError("authentication failed", 401),
  AuthorizationFailed: new APIError("authorization failed", 401),
  EmailNotAvailable: new APIError("email not available", 404),
  InvalidCredentials: new APIError("invalid credentials", 401),
  ServerError: new APIError("server failed to respond to your request", 501),
  InvalidParameters: new APIError("invalid parameters", 401),
};

// const errors = {
//   not_found: {
//     error: "requested resource is not found",
//     code: 404,
//   },
//   authentication_token_not_present: {
//     error: "authentication header missing",
//     code: 401,
//   },
//   authentication_token_malformed: {
//     error: "authentication token malformed",
//     code: 401,
//   },
//   authentication_failure: {
//     error: "authentication header invalid",
//     code: 401,
//   },
//   authentication_failure: {
//     error: "authorization failed",
//     code: 401,
//   },
//   email_not_available: {
//     error: "email is not available",
//     code: 401,
//   },
//   invalid_credentials: {
//     error: "invalid credentials",
//     code: 401,
//   },
//   server_error: {
//     error: "server failed to process your request",
//     code: 500,
//   },
//   invalid_parameters: {
//     error: "invalid parameters",
//     code: 401,
//   },
// };

export function errorHandler(err, req, res, next) {
  logger.error(
    `${MODULE} errored in handling ${req.method} request on ${
      req.originalUrl
    } ${err.message}: ${err.code == null ? err : ""} `
  );

  res.status(err.code || 500).send({
    status: false,
    error: err.code == null ? "server failed to respond" : err.message,
  });
}
