"use strict";
import * as ping from "./controller/ping.js";

function routes(app) {
  // Unprotected routes

  // Ping route
  app.get("/ping", ping.pong);

  // Generic 404s
  app.get("*", (_req, _res, next) => {
    return next(new Error("not_found"));
  });
  app.post("*", (_req, _res, next) => {
    return next(new Error("not_found"));
  });
}

export { routes };
