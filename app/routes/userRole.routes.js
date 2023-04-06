module.exports = (app) => {
  const userRole = require("../controllers/userRole.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new userRole
  router.post("/", [authenticate], userRole.create);
  // Retrieve all userRoles
  router.get("/", [authenticate], userRole.findAll);
  // Retrieve a single userRole with id
  router.get("/:id", [authenticate], userRole.findById);
  // Update a userRole with id
  router.put("/:id", [authenticate], userRole.update);
  // Delete a userRole with id
  router.delete("/:id", [authenticate], userRole.delete);
  // Delete all userRoles
  router.delete("/", [authenticate], userRole.deleteAll);
  // Get userRoles for userId
  router.get("/roles/userId/:userId", [authenticate], userRole.getRolesForUser);

  app.use("/performance-t7/userRole", router);
};
