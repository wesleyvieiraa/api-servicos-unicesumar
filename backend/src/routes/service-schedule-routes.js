const router = require("express").Router();
const serviceScheduleController = require("../controller/service-schedule-controller");
const middlewareAuthorization = require("../middleware/auth-middleware");

router.post(
  "/create",
  [middlewareAuthorization("ADMIN")],
  serviceScheduleController.createSchedule
);

module.exports = router;