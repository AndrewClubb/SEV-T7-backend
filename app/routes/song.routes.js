module.exports = (app) => {
  const song = require("../controllers/song.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new song
  router.post("/", [authenticate], song.create);
  // Retrieve all songs
  router.get("/", [authenticate], song.findAll);
  // Retrieve a single song with id
  router.get("/:id", [authenticate], song.findById);
  // Update a song with id
  router.put("/:id", [authenticate], song.update);
  // Delete a song with id
  router.delete("/:id", [authenticate], song.delete);
  // Delete all songs
  router.delete("/", [authenticate], song.deleteAll);
  // Get by composer Id
  router.get("/composer/:composerId", [authenticate], song.getByComposer);

  app.use("/performance-t7/song", router);
};
