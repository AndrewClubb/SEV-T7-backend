const db = require("../models");
const { Op } = require("sequelize");
const Critique = db.critique;

// Create and Save a new critique
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "type can not be empty!",
    });
    return;
  } else if (!req.body.comment) {
    res.status(400).send({
      message: "comment can not be empty!",
    });
    return;
  } else if (!req.body.jurorTimeslotId) {
    res.status(400).send({
      message: "jurorTimeslotId can not be empty!",
    });
    return;
  } else if (!req.body.studentTimeslotId) {
    res.status(400).send({
      message: "studentTimeslotId can not be empty!",
    });
    return;
  }

  const critique = {
    type: req.body.type,
    grade: req.body.grade,
    comment: req.body.comment,
    //critiquerId: req.body.critiquerId,
    jurorTimeslotId: req.body.jurorTimeslotId,
    // timeslotId: req.body.timeslotId,
    studentTimeslotId: req.body.studentTimeslotId,
  };

  // Create and Save a new critique
  Critique.create(critique)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the critique.",
      });
    });
};

// Retrieve all critiques from the database
exports.findAll = (req, res) => {
  Critique.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving critiques.",
      });
    });
};

// Retrieve a(n) critique by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Critique.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find critique with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving critique with id=" + id,
      });
    });
};

// Update a(n) critique by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Critique.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Critique was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update critique with id=" +
            id +
            ". Maybe the critique was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating critique with id=" + id,
      });
    });
};

// Delete a(n) critique with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Critique.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Critique was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete critique with id=" +
            id +
            ". Maybe the critique was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete critique with id=" + id,
      });
    });
};

// Delete all critique from the database.
exports.deleteAll = (req, res) => {
  Critique.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} critiques were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all critiques.",
      });
    });
};

exports.getCritiquesByTimeslotAndFaculty = (req, res) => {
  db.eventTimeslot
    .findAll({
      where: { id: req.params.timeslotId },
      include: {
        model: db.studentTimeslot,
        required: true,
        include: {
          model: db.critique,
          required: true,
          include: {
            model: db.jurorTimeslot,
            required: true,
            where: { jurorId: req.params.facultyId },
          },
        },
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
