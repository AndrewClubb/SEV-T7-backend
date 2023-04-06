const db = require("../models");
const { Op } = require("sequelize");
const Song = db.song;

// Create and Save a new song
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "title can not be empty!",
    });
    return;
  } else if (!req.body.composerId) {
    res.status(400).send({
      message: "composerId can not be empty!",
    });
    return;
  }

  const song = {
    title: req.body.title,
    composerId: req.body.composerId,
  };

  // Create and Save a new song
  Song.create(song)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the song.",
      });
    });
};

// Retrieve all songs from the database
exports.findAll = (req, res) => {
  Song.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};

// Retrieve a(n) song by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Song.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find song with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving song with id=" + id,
      });
    });
};

// Update a(n) song by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Song.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Song was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update song with id=" +
            id +
            ". Maybe the song was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating song with id=" + id,
      });
    });
};

// Delete a(n) song with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Song.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Song was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete song with id=" +
            id +
            ". Maybe the song was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete song with id=" + id,
      });
    });
};

// Delete all songs from the database.
exports.deleteAll = (req, res) => {
  Song.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} songs were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all songs.",
      });
    });
};

// Get by composer
exports.getByComposer = (req, res) => {
  Song.findAll({
    where: {
      composerId: { [Op.eq]: req.params.composerId },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving songs.",
      });
    });
};
