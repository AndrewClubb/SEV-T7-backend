const db = require("../models");
const { Op } = require("sequelize");
const EvaluationComment = db.evaluationComment;

// Create and Save a new evaluation comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "title can not be empty!"
    });
    return;
  } else if (!req.body.comment) {
    res.status(400).send({
      message: "comment can not be empty!"
    });
    return;
  } else if (!req.body.evaluationId) {
    res.status(400).send({
      message: "evaluationId can not be empty!"
    });
    return;
  }
  
  const evaluationComment = {
    title: req.body.title,
    comment: req.body.comment,
    evaluationId: req.body.evaluationId
  };

  // Create and Save a new evaluation comment
  EvaluationComment.create(evaluationComment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the evaluation comment."
      });
    });
};

// Retrieve all evaluation comments from the database
exports.findAll = (req, res) => {
  EvaluationComment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving evaluation comments."
      });
    });
};

// Retrieve a(n) evaluation comment by id
exports.findById = (req, res) => {
  const id = req.params.id;
  EvaluationComment.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find evaluation comment with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving evaluation comment with id=' + id
      });
    });
};

// Update a(n) evaluation comment by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EvaluationComment.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Evaluation comment was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update evaluation comment with id=' + id + '. Maybe the evaluation comment was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating evaluation comment with id=' + id
    });
  });
};

// Delete a(n) evaluation comment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  EvaluationComment.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'Evaluation comment was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete evaluation comment with id=' + id + '. Maybe the evaluation comment was not found'
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete evaluation comment with id=" + id,
    });
  });
};

// Delete all evaluation comments from the database.
exports.deleteAll = (req, res) => {
  EvaluationComment.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} evaluation comments were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all evaluation comment.",
      });
    });
};