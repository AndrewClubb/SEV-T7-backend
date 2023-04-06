module.exports = (app) => {
  const semester = require("../controllers/semester.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new semester
  router.post("/", [authenticate], semester.create);
  // Retrieve all semesters
  router.get("/", [authenticate], semester.findAll);
  // Retrieve a single semester with id
  router.get("/:id", [authenticate], semester.findById);
  // Update a semester with id
  router.put("/:id", [authenticate], semester.update);
  // Delete a semester with id
  router.delete("/:id", [authenticate], semester.delete);
  // Delete all semesters
  router.delete("/", [authenticate], semester.deleteAll);
  // Get current semester
  router.get("/date/:date", [authenticate], semester.getSemesterByDate);

  app.use("/performance-t2/semester", router);
};
