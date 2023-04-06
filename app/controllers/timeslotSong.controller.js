const db = require("../models");
const { Op } = require("sequelize");
const TimeslotSong = db.timeslotSong;

// Create and Save a new timeslotSong
exports.create = (req, res) => {
  // Validate request
  if (!req.body.timeslotId) {
    res.status(400).send({
      message: "timeslotId can not be empty!"
    });
    return;
  } else if (!req.body.songId) {
    res.status(400).send({
      message: "songId can not be empty!"
    });
    return;
  }
  
  const timeslotSong = {
    timeslotId: req.body.timeslotId,
    songId: req.body.songId
  };

  // Create and Save a new timeslotSong
  TimeslotSong.create(timeslotSong)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the timeslotSong."
      });
    });
};

// Retrieve all timeslotSongs from the database
exports.findAll = (req, res) => {
  TimeslotSong.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving timeslotSongs."
      });
    });
};

// Retrieve a(n) timeslotSong by id
exports.findById = (req, res) => {
  const id = req.params.id;
  TimeslotSong.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: 'Cannot find timeslotSong with id=' + id
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving timeslotSong with id=' + id
      });
    });
};

// Update a(n) timeslotSong by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  TimeslotSong.update(req.body, {
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'TimeslotSong was updated successfully.'
      });
    } else {
      res.send({
        message: 'Cannot update timeslotSong with id=' + id + '. Maybe the timeslotSong was not found or req.body is empty!'
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: 'Error updating timeslotSong with id=' + id
    });
  });
};

// Delete a(n) timeslotSong with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  TimeslotSong.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: 'TimeslotSong was deleted successfully!'
      });
    } else {
      res.send({
        message: 'Cannot delete timeslotSong with id=' + id + '. Maybe the timeslotSong was not found'
      })
    }
  })
  .catch((err) => {
    res.status(500).send({
      message: "Could not delete timeslotSong with id=" + id,
    });
  });
};

// Delete all timeslotSongs from the database.
exports.deleteAll = (req, res) => {
  TimeslotSong.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} timeslotSongs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all timeslotSongs.",
      });
    });
};