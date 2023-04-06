const db = require("../models");
const { Op } = require("sequelize");
const JurorTimeslot = db.jurorTimeslot;

// Create and Save a new jurorTimeslot
exports.create = (req, res) => {
  // Validate request
  if (!req.body.eventTimeslotId) {
    res.status(400).send({
      message: "eventTimeslotId can not be empty!",
    });
    return;
  } else if (!req.body.jurorId) {
    res.status(400).send({
      message: "jurorId can not be empty!",
    });
    return;
  }

  const jurorTimeslot = {
    eventTimeslotId: req.body.eventTimeslotId,
    jurorId: req.body.jurorId,
  };

  // Create and Save a new jurorTimeslot
  JurorTimeslot.create(jurorTimeslot)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the jurorTimeslot.",
      });
    });
};

// Retrieve all jurorTimeslots from the database
exports.findAll = (req, res) => {
  JurorTimeslot.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jurorTimeslots.",
      });
    });
};

// Retrieve a(n) jurorTimeslot by id
exports.findById = (req, res) => {
  const id = req.params.id;
  JurorTimeslot.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find jurorTimeslot with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving jurorTimeslot with id=" + id,
      });
    });
};

// Update a(n) jurorTimeslot by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  JurorTimeslot.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "jurorTimeslot was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update jurorTimeslot with id=" +
            id +
            ". Maybe the jurorTimeslot was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating jurorTimeslot with id=" + id,
      });
    });
};

// Delete a(n) jurorTimeslot with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  JurorTimeslot.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "jurorTimeslot was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete jurorTimeslot with id=" +
            id +
            ". Maybe the jurorTimeslot was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete jurorTimeslot with id=" + id,
      });
    });
};

// Delete all jurorTimeslots from the database.
exports.deleteAll = (req, res) => {
  JurorTimeslot.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} jurorTimeslots were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all jurorTimeslots.",
      });
    });
};
