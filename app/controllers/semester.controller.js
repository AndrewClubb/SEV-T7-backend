const db = require("../models");
const { Op } = require("sequelize");
const Semester = db.semester;

// Create and Save a new semester
exports.create = (req, res) => {
  // Validate request
  if (!req.body.year) {
    res.status(400).send({
      message: "year can not be empty!",
    });
    return;
  } else if (!req.body.code) {
    res.status(400).send({
      message: "semester code can not be empty!",
    });
    return;
  }

  const semester = {
    year: req.body.year,
    code: req.body.code,
  };

  // Create and Save a new semester
  Semester.create(semester)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the semester.",
      });
    });
};

// Retrieve all semesters from the database
exports.findAll = (req, res) => {
  Semester.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving semesters.",
      });
    });
};

// Retrieve a(n) semester by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Semester.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find semester with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving semester with id=" + id,
      });
    });
};

// Update a(n) semester by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Semester.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update semester with id=" +
            id +
            ". Maybe the semester was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating semester with id=" + id,
      });
    });
};

// Delete a(n) semester with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Semester.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete semester with id=" +
            id +
            ". Maybe the semester was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete semester with id=" + id,
      });
    });
};

// Delete all semester from the database.
exports.deleteAll = (req, res) => {
  Semester.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} semesters were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all semesters.",
      });
    });
};

//Get current semester
exports.getSemesterByDate = (req, res) => {
  Semester.findAll({
    where: {
      startDate: { [Op.lte]: req.params.date },
      endDate: { [Op.gte]: req.params.date },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.stats(500).send({
        message:
          err.message ||
          "Some error occurred while getting the current semester.",
      });
    });
};
