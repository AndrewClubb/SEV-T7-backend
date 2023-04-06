const db = require("../models");
const { Op } = require("sequelize");
const StudentTimeslot = db.studentTimeslot;

// Create and Save a new studentTimeslot
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studentInstrumentId) {
    res.status(400).send({
      message: "studentInstrumentId can not be empty!",
    });
    return;
  } else if (!req.body.eventTimeslotId) {
    res.status(400).send({
      message: "eventTimeslotId can not be empty!",
    });
    return;
  } else if (!req.body.instructorId) {
    res.status(400).send({
      message: "instructorId can not be empty!",
    });
    return;
  }

  const studentTimeslot = {
    studentInstrumentId: req.body.studentInstrumentId,
    eventTimeslotId: req.body.eventTimeslotId,
    instructorId: req.body.instructorId,
  };

  // Create and Save a new studentTimeslot
  StudentTimeslot.create(studentTimeslot)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the studentTimeslot.",
      });
    });
};

// Retrieve all studentTimeslots from the database
exports.findAll = (req, res) => {
  StudentTimeslot.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving studentTimeslots.",
      });
    });
};

// Retrieve a(n) studentTimeslot by id
exports.findById = (req, res) => {
  const id = req.params.id;
  StudentTimeslot.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find studentTimeslot with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving studentTimeslot with id=" + id,
      });
    });
};

// Update a(n) studentTimeslot by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentTimeslot.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentTimeslot was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update studentTimeslot with id=" +
            id +
            ". Maybe the studentTimeslot was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating studentTimeslot with id=" + id,
      });
    });
};

// Delete a(n) studentTimeslot with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentTimeslot.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentTimeslot was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete studentTimeslot with id=" +
            id +
            ". Maybe the studentTimeslot was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete studentTimeslot with id=" + id,
      });
    });
};

// Delete all studentTimeslots from the database.
exports.deleteAll = (req, res) => {
  StudentTimeslot.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} studentTimeslots were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all studentTimeslots.",
      });
    });
};
