const db = require("../models");
const { Op } = require("sequelize");
const Event = db.event;
const StudentTimeslot = db.studentTimeslot;

// Create and Save a new event
exports.create = (req, res) => {
  // Validate request
  if (!req.body.date) {
    res.status(400).send({
      message: "Date can not be empty!",
    });
    return;
  } else if (req.body.isPrivateEvent == undefined) {
    res.status(400).send({
      message: "isPrivateEvent can not be empty!",
    });
    return;
  } else if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  } else if (req.body.canMergeSlots == undefined) {
    res.status(400).send({
      message: "canMergeSlots can not be empty!",
    });
    return;
  } else if (!req.body.slotDuration) {
    res.status(400).send({
      message: "slot duration can not be empty!",
    });
    return;
  } else if (!req.body.semesterId) {
    res.status(400).send({
      message: "semesterId can not be empty!",
    });
    return;
  }

  const event = {
    type: req.body.type,
    name: req.body.name,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    isPrivateEvent: req.body.isPrivateEvent,
    canMergeSlots: req.body.canMergeSlots,
    slotDuration: req.body.slotDuration,
    semesterId: req.body.semesterId,
  };

  // Create and Save a new event
  Event.create(event)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};

// Retrieve all events from the database
exports.findAll = (req, res) => {
  Event.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Retrieve a(n) event by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Event.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find event with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving event with id=" + id,
      });
    });
};

// Retrieve all events from the database from the specified date onwards
exports.findDateAndAfter = (req, res) => {
  const date = req.params.date;
  Event.findAll({
    where: {
      date: {
        [Op.gte]: date,
      },
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find event on or after " + date,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Update a(n) event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Event.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update event with id=" +
            id +
            ". Maybe the event was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating event with id=" + id,
      });
    });
};

// Delete a(n) event with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  //get all student timeslots
  Event.findAll({
    where: {
      id: { [Op.eq]: id },
    },
    include: {
      model: db.eventTimeslot,
      required: false,
      include: [
        {
          model: db.studentTimeslot,
          required: false,
        },
        {
          model: db.jurorTimeslot,
          required: false,
        },
        {
          model: db.timeslotSong,
          required: false,
        },
      ],
    },
  })
    .then(async (data) => {
      for (let x = 0; x < data[0].dataValues.eventTimeslots.length; x++) {
        const curEventTS = data[0].dataValues.eventTimeslots[x].dataValues;
        for (let y = 0; y < curEventTS.studentTimeslots.length; y++) {
          const curStuTS = curEventTS.studentTimeslots[y].dataValues;
          await db.studentTimeslot.destroy({
            where: { id: curStuTS.id },
          });
        }
        for (let y = 0; y < curEventTS.jurorTimeslots.length; y++) {
          const curJurTS = curEventTS.jurorTimeslots[y].dataValues;
          await db.jurorTimeslot.destroy({ where: { id: curJurTS.id } });
        }
        for (let y = 0; y < curEventTS.timeslotSongs.length; y++) {
          const curTSS = curEventTS.timeslotSongs[y].dataValues;
          await db.timeslotSong.destroy({ where: { id: curTSS.id } });
        }

        db.eventTimeslot.destroy({ where: { id: curEventTS.id } });
      }

      Event.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              message: "Event was deleted successfully!",
            });
          } else {
            res.send({
              message:
                "Cannot delete event with id=" +
                id +
                ". Maybe the event was not found",
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: "Could not delete event with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error finding event with id=" + id,
        error: err,
      });
    });
};

// Delete all events from the database.
exports.deleteAll = (req, res) => {
  Event.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} events were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all event.",
      });
    });
};

exports.getStudentTimeslotsForEventId = (req, res) => {
  Event.findAll({
    where: { id: req.params.eventId },
    include: {
      model: db.eventTimeslot,
      required: true,
      include: {
        model: db.studentTimeslot,
        required: true,
        include: {
          model: db.studentInstrument,
          required: true,
          include: {
            model: db.userRole,
            required: true,
            as: "student",
            include: {
              model: db.user,
              required: true,
            },
          },
        },
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

exports.getEventCritiquesBySemesterId = (req, res) => {
  db.user
    .findAll({
      include: {
        model: db.userRole,
        required: true,
        include: {
          model: db.studentInstrument,
          as: "student",
          required: true,
          include: {
            model: db.studentTimeslot,
            required: true,
            include: [
              {
                model: db.eventTimeslot,
                required: true,
                include: {
                  model: db.event,
                  required: true,
                  where: {
                    semesterId: { [Op.eq]: req.params.semesterId },
                  },
                },
              },
              {
                model: db.critique,
                required: true,
              },
            ],
          },
        },
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Retrieve critiques by semester id and student id
exports.getEventCritiquesBySemesterAndStudent = (req, res) => {
  Event.findAll({
    where: {
      semesterId: { [Op.eq]: req.params.semesterId },
    },
    include: {
      model: db.eventTimeslot,
      required: true,
      include: [
        {
          model: db.studentTimeslot,
          required: true,
          include: {
            model: db.studentInstrument,
            required: true,
            include: [
              {
                model: db.instrument,
                required: true,
              },
              {
                model: db.userRole,
                as: "student",
                required: true,
                include: {
                  model: db.user,
                  where: {
                    id: { [Op.eq]: req.params.userId },
                  },
                  required: true,
                },
              },
            ],
          },
        },
        {
          model: db.jurorTimeslot,
          required: true,
          include: [
            {
              model: db.userRole,
              required: true,
              include: {
                model: db.user,
                required: true,
              },
            },
            {
              model: db.critique,
              required: true,
            },
          ],
        },
      ],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Retrieve all events by semester
exports.getEventsBySemesterId = (req, res) => {
  Event.findAll({
    where: { semesterId: { [Op.eq]: req.params.semesterId } },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

// Get all event types
exports.getAllEventTypes = (req, res) => {
  Event.findAll({
    attributes: [db.sequelize.fn("DISTINCT", db.sequelize.col("type")), "type"],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
