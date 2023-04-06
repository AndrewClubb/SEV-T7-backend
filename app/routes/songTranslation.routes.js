module.exports = (app) => {
  const songTranslation = require("../controllers/songTranslation.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new songTranslation
  router.post("/", [authenticate], songTranslation.create);
  // Retrieve all songTranslations
  router.get("/", [authenticate], songTranslation.findAll);
  // Retrieve a single songTranslation with id
  router.get("/:id", [authenticate], songTranslation.findById);
  // Update a songTranslation with id
  router.put("/:id", [authenticate], songTranslation.update);
  // Delete a songTranslation with id
  router.delete("/:id", [authenticate], songTranslation.delete);
  // Delete all songTranslations
  router.delete("/", [authenticate], songTranslation.deleteAll);

  app.use("/performance-t2/songTranslation", router);
};
