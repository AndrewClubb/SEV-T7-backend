const db = require("../models");
const { Op } = require("sequelize");
const Availability = db.availability;

// Create and Save a new availability
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({
      message: "date can not be empty!",
    });
    return;
  } else if (!req.body.startTime) {
    res.status(400).send({
      message: "start time can not be empty!",
    });
    return;
  } else if (!req.body.endTime) {
    res.status(400).send({
      message: "end time can not be empty!",
    });
    return;
  } else if (!req.body.userId) {
    res.status(400).send({
      message: "userId can not be empty!",
    });
    return;
  } else if (!req.body.eventId) {
    res.status(400).send({
      message: "eventId can not be empty!",
    });
    return;
  }

  const availability = {
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    userId: req.body.userId,
    eventId: req.body.eventId,
  };

  // Create and Save a new availability
  Availability.create(availability)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the availability.",
      });
    });
};

// Retrieve all availabilities from the database
exports.findAll = (req, res) => {
  Availability.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Availabilities.",
      });
    });
};

// Retrieve a(n) availability by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Availability.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find availability with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving availability with id=" + id,
      });
    });
};

// Update a(n) availability by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Availability.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Availability was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update availability with id=" +
            id +
            ". Maybe the availability was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating availability with id=" + id,
      });
    });
};

// Delete a(n) availability with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Availability.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Availability was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete availability with id=" +
            id +
            ". Maybe the availability was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete availability with id=" + id,
      });
    });
};

// Delete all availability from the database.
exports.deleteAll = (req, res) => {
  Availability.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} availability were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all availability.",
      });
    });
};

// Get all availability for a user
exports.getByUser = (req, res) => {
  Availability.findAll({
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
          err.message || "Some error occurred while retrieving Availabilities.",
      });
    });
};

//
exports.getByUserAndEvent = (req, res) => {
  Availability.findAll({
    where: {
      userId: { [Op.eq]: req.params.userId },
      eventId: { [Op.eq]: req.params.eventId },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Availabilities.",
      });
    });
};
