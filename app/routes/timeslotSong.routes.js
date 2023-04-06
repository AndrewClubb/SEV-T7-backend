module.exports = (app) => {
  const timeslotSong = require("../controllers/timeslotSong.controller.js");
  const { authenticate } = require("../authorization/authorization.js");
  var router = require("express").Router();

  // Create a new timeslotSong
  router.post("/", [authenticate], timeslotSong.create);
  // Retrieve all timeslotSongs
  router.get("/", [authenticate], timeslotSong.findAll);
  // Retrieve a single timeslotSong with id
  router.get("/:id", [authenticate], timeslotSong.findById);
  // Update a timeslotSong with id
  router.put("/:id", [authenticate], timeslotSong.update);
  // Delete a timeslotSong with id
  router.delete("/:id", [authenticate], timeslotSong.delete);
  // Delete all timeslotSongs
  router.delete("/", [authenticate], timeslotSong.deleteAll);

  app.use("/performance-t7/timeslotSong", router);
};
