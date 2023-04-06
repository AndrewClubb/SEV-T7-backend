module.exports = (app) => {
  const instrument = require("../controllers/instrument.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new instrument
  router.post("/", [authenticate], instrument.create);
  // Retrieve all instruments
  router.get("/", [authenticate], instrument.findAll);
  // Retrieve a single instrument with id
  router.get("/:id", [authenticate], instrument.findById);
  // Update a instrument with id
  router.put("/:id", [authenticate], instrument.update);
  // Delete a instrument with id
  router.delete("/:id", [authenticate], instrument.delete);
  // Delete all instruments
  router.delete("/", [authenticate], instrument.deleteAll);

  app.use("/performance-t2/instrument", router);
};
