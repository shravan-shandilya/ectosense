"use strict";
import {
  authenticate,
  authorize,
  handleSignup,
  handleLogin,
} from "./controller/auth.js";

import * as ac from "./controller/appointment.js"; // ac  -> appointmentController
import * as rc from "./controller/record.js"; // rc -> recordController

function routes(app) {
  // Unprotected routes
  app.post("/v1/signup", handleSignup);
  app.post("/v1/login", handleLogin);

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
