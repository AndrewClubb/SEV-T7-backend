const db = require("../models");
const { Op } = require("sequelize");
const UserRole = db.userRole;

// Create and Save a new userRole
exports.create = (req, res) => {
  // Validate request
  if (!req.body.role) {
    res.status(400).send({
      message: "role can not be empty!",
    });
    return;
  } else if (!req.body.userId) {
    res.status(400).send({
      message: "userId can not be empty!",
    });
    return;
  }

  const userRole = {
    role: req.body.role,
    type: req.body.type,
    stuClassification: req.body.stuClassification,
    stuMajor: req.body.stuMajor,
    stuNumOfSemesters: req.body.stuNumOfSemesters,
    stuEmailCritiqueBool: req.body.stuEmailCritiqueBool,
    stuCompletedHearing: req.body.stuCompletedHearing,
    title: req.body.title,
    userId: req.body.userId,
  };

  // Create and Save a new userRole
  UserRole.create(userRole)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the userRole.",
      });
    });
};

// Retrieve all userRoles from the database
exports.findAll = (req, res) => {
  UserRole.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userRoles.",
      });
    });
};

// Retrieve a(n) userRole by id
exports.findById = (req, res) => {
  const id = req.params.id;
  UserRole.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find userRole with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving userRole with id=" + id,
      });
    });
};

// Update a(n) userRole by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  UserRole.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserRole was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update userRole with id=" +
            id +
            ". Maybe the userRole was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating userRole with id=" + id,
      });
    });
};

// Delete a(n) userRole with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  UserRole.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "UserRole was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete userRole with id=" +
            id +
            ". Maybe the userRole was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete userRole with id=" + id,
      });
    });
};

// Delete all userRoles from the database.
exports.deleteAll = (req, res) => {
  UserRole.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} userRoles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userRoles.",
      });
    });
};

exports.getRolesForUser = (req, res) => {
  UserRole.findAll({
    where: {
      userId: { [Op.eq]: req.params.userId },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving userRoles.",
      });
    });
};
