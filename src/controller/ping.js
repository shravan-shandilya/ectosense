"use strict";
const errors = {};

export function pong(req, res, next) {
  let errorType =
    Object.keys(errors).indexOf(err.message) >= 0
      ? err.message
      : "server_error";
  let error = errors[errorType];
  error.data = err.data;

  if (error.code >= 400 && error.code <= 510 && err.message !== "not_found") {
    logger.error(MODULE + " errored in handling request:", {
      error: err.message,
      //data: req.body,
      method: req.method,
      path: req.originalUrl,
      //headers: req.headers
    });
  }

  res.status(error.code).send(error);
  res.send("pong");
}
