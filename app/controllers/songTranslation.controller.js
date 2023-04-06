const db = require("../models");
const { Op } = require("sequelize");
const SongTranslation = db.songTranslation;

// Create and Save a new songTranslation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.type) {
    res.status(400).send({
      message: "type not be empty!"
    });
    return;
  } else if (!req.body.text) {
    res.status(400).send({
      message: "text can not be empty!"
    });
    return;
  } else if (!req.body.songId) {
    res.status(400).send({
      message: "songId can not be empty!"
    });
    return;
  }
  
  const songTranslation = {
    type: req.body.type,
    text: req.body.text,
    songId: req.body.songId
  };

  // Create and Save a new songTranslation
  SongTranslation.create(songTranslation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the songTranslation."
      });
    });
};

// Retrieve all songTranslations from the database
exports.findAll = (req, res) => {
  SongTranslation.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving songTranslations."
      });
    });
};

// Retrieve a(n) songTranslation by id
exports.findById = (req, res) => {
  const id = req.params.id;
  SongTranslation.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find songTranslation with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving songTranslation with id=' + id
      });
    });
};

// Update a(n) songTranslation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  SongTranslation.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'SongTranslation was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update songTranslation with id=' + id + '. Maybe the songTranslation was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating songTranslation with id=' + id
    });
  });
};

// Delete a(n) songTranslation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  SongTranslation.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'SongTranslation was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete songTranslation with id=' + id + '. Maybe the songTranslation was not found'
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete songTranslation with id=" + id,
    });
  });
};

// Delete all songTranslations from the database.
exports.deleteAll = (req, res) => {
  SongTranslation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} songTranslations were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all songTranslations.",
      });
    });
};