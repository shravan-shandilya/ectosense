"use strict";
import { authenticate, authorize } from "./controller/auth.js";
import * as uc from "./controller/user.js";
import * as ac from "./controller/appointment.js"; // ac  -> appointmentController
import * as rc from "./controller/record.js"; // rc -> recordController

import { validate } from "../utils/validator.js";

function routes(app) {
  // Unprotected routes
  app.post("/v1/signup", validate("signup"), uc.handleSignup);
  app.post("/v1/login", validate("login"), uc.handleLogin);

  // Appointments route
  app.get("/v1/appointment", authenticate, authorize, ac.getAppointments);
  app.get(
    "/v1/appointment/:appointmentId",
    authenticate,
    authorize,
    ac.getAppointment
  );
  app.post("/v1/appointment", authenticate, authorize, ac.createAppointment);
  app.put("/v1/appointment", authenticate, authorize, ac.modifyAppointment);

  // Medical Record routes
  app.post("/v1/record", authenticate, authorize, rc.createRecord);
  app.get("/v1/record", authenticate, authorize, rc.getRecords);
  app.get("/v1/record/:recordId", authenticate, authorize, rc.getRecord);
  app.post(
    "/v1/record/:recordId/share",
    authenticate,
    authorize,
    rc.shareRecord
  );
  app.delete("/v1/record/:recordId", authenticate, authorize, rc.deleteRecord);

  // Generic 404s
  app.get("*", (_req, _res, next) => {
    return next(new Error("not_found"));
  });
  app.post("*", (_req, _res, next) => {
    return next(new Error("not_found"));
  });
}

export { routes };