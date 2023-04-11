module.exports = (app) => {
  const event = require("../controllers/event.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new event
  router.post("/", [authenticate], event.create);
  // Retrieve all events
  router.get("/", [authenticate], event.findAll);
  // Retrieve a single event with id
  router.get("/:id", [authenticate], event.findById);
  // Retrieve all events with date after date
  router.get("/date/:date", [authenticate], event.findDateAndAfter);
  // Update a event with id
  router.put("/:id", [authenticate], event.update);
  // Delete a event with id
  router.delete("/:id", [authenticate], event.delete);
  // Delete all events
  router.delete("/", [authenticate], event.deleteAll);
  // Retrieve timeslots fore current date
  router.get(
    "/critiqueTimeslots/:date",
    [authenticate],
    event.getStudentTimeslotsForCurrentDate
  );

  // Retrieve critiques by semester id
  router.get(
    "/semesterCritiques/:semesterId",
    [authenticate],
    event.getEventCritiquesBySemesterId
  );

  // Retrieve critiques by semester id and student id
  router.get(
    "/semesterCritiques/:semesterId/user/:userId",
    [authenticate],
    event.getEventCritiquesBySemesterAndStudent
  );
  // Retrieve all events within a semester
  router.get(
    "/semesterId/:semesterId",
    [authenticate],
    event.getEventsBySemesterId
  );

  // Get all event types
  router.get("/types/unique", [authenticate], event.getAllEventTypes);

  app.use("/performance-t7/event", router);
};
