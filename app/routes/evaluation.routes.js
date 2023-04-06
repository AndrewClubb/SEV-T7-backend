module.exports = (app) => {
  const evaluation = require("../controllers/evaluation.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new evaluation
  router.post("/", [authenticate], evaluation.create);
  // Retrieve all evaluations
  router.get("/", [authenticate], evaluation.findAll);
  // Retrieve a single evaluation with id
  router.get("/:id", [authenticate], evaluation.findById);
  // Update a evaluation with id
  router.put("/:id", [authenticate], evaluation.update);
  // Delete a evaluation with id
  router.delete("/:id", [authenticate], evaluation.delete);
  // Delete all evaluations
  router.delete("/", [authenticate], evaluation.deleteAll);

  app.use("/performance-t2/evaluation", router);
};
