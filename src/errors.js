"use strict";
import logger from "../utils/logger.js";

const MODULE = "[Errors]";

const errors = {
  not_found: {
    error: "requested resource is not found",
    code: 404,
  },
  auth_not_present: { error: "authorization header missing", code: 401 },
  auth_failure: {
    error: "authorization failed",
    code: 401,
  },
  email_not_available: {
    error: "email is not available",
    code: 401,
  },
  invalid_credentials: {
    error: "invalid credentials",
    code: 401,
  },
  server_error: {
    error: "server failed to process your request",
    code: 500,
  },
  invalid_parameters: {
    error: "invalid parameters",
    code: 401,
  },
};

export function errorHandler(err, req, res, next) {
  let errorType =
    Object.keys(errors).indexOf(err.message) > 0 ? err.message : "server_error";
  let error = errors[errorType];

  logger.error(
    `${MODULE} errored in handling ${req.method} request on ${req.originalUrl} ${errorType}`
  );

  if (errorType === "server_error") {
    logger.error(err);
  }

  res.status(error.code).send(error);
}
