module.exports = (app) => {
  const eventTimeslot = require("../controllers/eventTimeslot.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new eventTimeslot
  router.post("/", [authenticate], eventTimeslot.create);
  // Retrieve all eventTimeslots
  router.get("/", [authenticate], eventTimeslot.findAll);
  // Retrieve a single eventTimeslot with id
  router.get("/:id", [authenticate], eventTimeslot.findById);
  // Retrieve all eventTimeslots with eventId of id
  router.get("/event/:id", [authenticate], eventTimeslot.findByEventId);
  // Update a eventTimeslot with id
  router.put("/:id", [authenticate], eventTimeslot.update);
  // Delete a eventTimeslot with id
  router.delete("/:id", [authenticate], eventTimeslot.delete);
  // Delete all eventTimeslots
  router.delete("/", [authenticate], eventTimeslot.deleteAll);

  app.use("/performance-t7/eventTimeslot", router);
};
