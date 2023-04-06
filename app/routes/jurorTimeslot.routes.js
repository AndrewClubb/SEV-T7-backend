module.exports = (app) => {
  const jurorTimeslot = require("../controllers/jurorTimeslot.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new jurorTimeslot
  router.post("/", [authenticate], jurorTimeslot.create);
  // Retrieve all jurorTimeslots
  router.get("/", [authenticate], jurorTimeslot.findAll);
  // Retrieve a single jurorTimeslot with id
  router.get("/:id", [authenticate], jurorTimeslot.findById);
  // Update a jurorTimeslot with id
  router.put("/:id", [authenticate], jurorTimeslot.update);
  // Delete a jurorTimeslot with id
  router.delete("/:id", [authenticate], jurorTimeslot.delete);
  // Delete all jurorTimeslots
  router.delete("/", [authenticate], jurorTimeslot.deleteAll);

  app.use("/performance-t7/jurorTimeslot", router);
};
