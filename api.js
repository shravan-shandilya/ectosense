"use strict";
import express from "express";
import bodyParser from "body-parser";
import logger from "./utils/logger.js";
import { initDatabase } from "./utils/db.js";

import { errorHandler } from "./src/errors.js";

const port = process.env.PORT || 8000;
const MODULE = "[API]";

(async function () {
  logger.info(`${MODULE} initializing the database: ${await initDatabase()}`);
  const router = await import("./src/router.js");

  // create express app
  const app = express();

  // misc. middlewares
  app.use(bodyParser.urlencoded({ extended: true }));

  // register all routes
  router.routes(app);

  // register custom error handler
  app.use(errorHandler);

  app.listen(port);
  logger.info(`${MODULE} http api server started on port: ${port}`);
})();
