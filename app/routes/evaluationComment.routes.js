module.exports = (app) => {
  const evaluationComment = require("../controllers/evaluationComment.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new evaluationComment
  router.post("/", [authenticate], evaluationComment.create);
  // Retrieve all evaluationComments
  router.get("/", [authenticate], evaluationComment.findAll);
  // Retrieve a single evaluationComment with id
  router.get("/:id", [authenticate], evaluationComment.findById);
  // Update a evaluationComment with id
  router.put("/:id", [authenticate], evaluationComment.update);
  // Delete a evaluationComment with id
  router.delete("/:id", [authenticate], evaluationComment.delete);
  // Delete all evaluationComments
  router.delete("/", [authenticate], evaluationComment.deleteAll);

  app.use("/performance-t2/evaluationComment", router);
};
