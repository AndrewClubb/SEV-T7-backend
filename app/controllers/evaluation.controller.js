const db = require("../models");
const { Op } = require("sequelize");
const Evaluation = db.evaluation;

// Create and Save a new evaluation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "type can not be empty!"
    });
    return;
  } else if (!req.body.courseName) {
    res.status(400).send({
      message: "course name can not be empty!"
    });
    return;
  } else if (!req.body.facultyId) {
    res.status(400).send({
      message: "facultyId can not be empty!"
    });
    return;
  } else if (!req.body.studentId) {
    res.status(400).send({
      message: "studentId can not be empty!"
    });
    return;
  }
  
  const evaluation = {
    type: req.body.type,
    courseName: req.body.courseName,
    facultyId: req.body.facultyId,
    studentId: req.body.studentId
  };

  // Create and Save a new evaluation
  Evaluation.create(evaluation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the evaluation."
      });
    });
};

// Retrieve all evaluations from the database
exports.findAll = (req, res) => {
  Evaluation.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving evaluations."
      });
    });
};

// Retrieve a(n) evaluation by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Evaluation.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find evaluation with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving evaluation with id=' + id
      });
    });
};

// Update a(n) evaluation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Evaluation.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Evaluation was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update evaluation with id=' + id + '. Maybe the evaluation was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating evaluation with id=' + id
    });
  });
};

// Delete a(n) evaluation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Evaluation.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Evaluation was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete evaluation with id=' + id + '. Maybe the evaluation was not found'
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete evaluation with id=" + id,
    });
  });
};

// Delete all evaluation from the database.
exports.deleteAll = (req, res) => {
  Evaluation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} evaluations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all evaluations.",
      });
    });
};