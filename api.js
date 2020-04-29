"use strict";
import express from "express";
import logger from "./utils/logger.js";
import { initDatabase } from "./utils/db.js";
import { routes } from "./src/routes.js";
import { errorHandler } from "./src/errors.js";

const port = process.env.PORT || 8000;
const MODULE = "[Ectosense API]";

const app = express();

(async function () {
  logger.info(`${MODULE} initializing the database: ${await initDatabase()}`);

  routes(app);

  app.use(errorHandler);

  app.listen(port);
  logger.info(`${MODULE} http api server started on port: ${port}`);
})();
