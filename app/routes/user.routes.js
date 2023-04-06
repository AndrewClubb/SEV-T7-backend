module.exports = (app) => {
  const user = require("../controllers/user.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new user
  router.post("/", [authenticate], user.create);
  // Retrieve all users
  router.get("/", [authenticate], user.findAll);
  // Retrieve a single user with id
  router.get("/:id", [authenticate], user.findById);
  // Update a user with id
  router.put("/:id", [authenticate], user.update);
  // Delete a user with id
  router.delete("/:id", [authenticate], user.delete);
  // Delete all users
  router.delete("/", [authenticate], user.deleteAll);

  app.use("/performance-t2/user", router);
};
