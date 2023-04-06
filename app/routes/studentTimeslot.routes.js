module.exports = (app) => {
  const studentTimeslot = require("../controllers/studentTimeslot.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new studentTimeslot
  router.post("/", [authenticate], studentTimeslot.create);
  // Retrieve all studentTimeslots
  router.get("/", [authenticate], studentTimeslot.findAll);
  // Retrieve a single studentTimeslot with id
  router.get("/:id", [authenticate], studentTimeslot.findById);
  // Update a studentTimeslot with id
  router.put("/:id", [authenticate], studentTimeslot.update);
  // Delete a studentTimeslot with id
  router.delete("/:id", [authenticate], studentTimeslot.delete);
  // Delete all studentTimeslots
  router.delete("/", [authenticate], studentTimeslot.deleteAll);

  app.use("/performance-t7/studentTimeslot", router);
};
