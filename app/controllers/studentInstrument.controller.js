const db = require("../models");
const { Op } = require("sequelize");
const StudentInstrument = db.studentInstrument;

// Create and Save a new studentInstrument
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studentId) {
    res.status(400).send({
      message: "studentId can not be empty!",
    });
    return;
  } else if (!req.body.instrumentId) {
    res.status(400).send({
      message: "instrumentId can not be empty!",
    });
    return;
  } else if (!req.body.instructorId) {
    res.status(400).send({
      message: "instructorId can not be empty!",
    });
    return;
  }

  const studentInstrument = {
    level: req.body.level,
    studentId: req.body.studentId,
    instrumentId: req.body.instrumentId,
    accompanistId: req.body.accompanistId,
    instructorId: req.body.instructorId,
  };

  // Create and Save a new studentInstrument
  StudentInstrument.create(studentInstrument)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the studentInstrument.",
      });
    });
};

// Retrieve all studentInstruments from the database
exports.findAll = (req, res) => {
  StudentInstrument.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving studentInstruments.",
      });
    });
};

// Retrieve a(n) studentInstrument by id
exports.findById = (req, res) => {
  const id = req.params.id;
  StudentInstrument.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find studentInstrument with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving studentInstrument with id=" + id,
      });
    });
};

// Update a(n) studentInstrument by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  StudentInstrument.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInstrument was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update studentInstrument with id=" +
            id +
            ". Maybe the studentInstrument was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating studentInstrument with id=" + id,
      });
    });
};

// Delete a(n) studentInstrument with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  StudentInstrument.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "StudentInstrument was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete studentInstrument with id=" +
            id +
            ". Maybe the studentInstrument was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete studentInstrument with id=" + id,
      });
    });
};

// Delete all studentInstruments from the database.
exports.deleteAll = (req, res) => {
  StudentInstrument.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} studentInstruments were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all studentInstruments.",
      });
    });
};

exports.getByUserId = (req, res) => {
  StudentInstrument.findAll({
    include: [
      {
        model: db.userRole,
        as: "student",
        required: true,
        include: {
          model: db.user,
          required: true,
          where: {
            id: { [Op.eq]: req.params.userId },
          },
        },
      },
      {
        model: db.userRole,
        as: "instructor",
        required: true,
        include: {
          model: db.user,
          required: true,
          include: [
            {
              model: db.availability,
              required: false,
            },
          ],
        },
      },
      {
        model: db.userRole,
        as: "accompanist",
        required: true,
        include: {
          model: db.user,
          required: true,
          include: [
            {
              model: db.availability,
              required: false,
            },
          ],
        },
      },
      {
        model: db.instrument,
        required: true,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving studentInstruments.",
      });
    });
};
