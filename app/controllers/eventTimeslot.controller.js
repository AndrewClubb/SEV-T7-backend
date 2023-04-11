const db = require("../models");
const { Op } = require("sequelize");
const EventTimeslot = db.eventTimeslot;

// Create and Save a new eventTimeslot
exports.create = (req, res) => {
  // Validate request
  if (!req.body.startTime) {
    res.status(400).send({
      message: "start time can not be empty!",
    });
    return;
  } else if (!req.body.endTime) {
    res.status(400).send({
      message: "end time can not be empty!",
    });
    return;
  } else if (!req.body.eventId) {
    res.status(400).send({
      message: "eventId can not be empty!",
    });
    return;
  }

  const eventTimeslot = {
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    hasPassed: req.body.hasPassed,
    isComplete: req.body.isComplete,
    isReserved: req.body.isReserved,
    accompanistId: req.body.accompanistId,
    eventId: req.body.eventId,
  };

  // Create and Save a new eventTimeslot
  EventTimeslot.create(eventTimeslot)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the eventTimeslot.",
      });
    });
};

// Retrieve all eventTimeslots from the database
exports.findAll = (req, res) => {
  EventTimeslot.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving eventTimeslots.",
      });
    });
};

// Retrieve a(n) eventTimeslot by id
exports.findById = (req, res) => {
  const id = req.params.id;
  EventTimeslot.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find eventTimeslot with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving eventTimeslot with id=" + id,
      });
    });
};

// Retrieve a(n) eventTimeslot by id
exports.findByEventId = (req, res) => {
  const id = req.params.id;
  EventTimeslot.findAll({
    where: {
      eventId: id,
    },
  })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find eventTimeslots with EventId=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving eventTimeslot with EventId=" + id,
      });
    });
};

// Update a(n) eventTimeslot by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  EventTimeslot.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "EventTimeslot was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update eventTimeslot with id=" +
            id +
            ". Maybe the eventTimeslot was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating eventTimeslot with id=" + id,
      });
    });
};

// Delete a(n) eventTimeslot with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  //get all student timeslots
  EventTimeslot.findAll({
    where: {
      id: { [Op.eq]: id },
    },
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
  })
    .then(async (data) => {
      const curEventTS = data[0].dataValues;

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

      EventTimeslot.destroy({
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
            message: "Could not delete eventTimeslot with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error finding eventTimeslot with id=" + id,
        error: err,
      });
    });
};

// Delete all eventTimeslots from the database.
exports.deleteAll = (req, res) => {
  EventTimeslot.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} eventTimeslots were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all eventTimeslots.",
      });
    });
};

exports.getEventCritiquesBySemesterId = (req, res) => {
  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  Event.findAll({
    where: {
      semesterId: { [Op.eq]: req.params.semesterId },
    },
    attributes: ["id", "date", "type"],
    include: {
      model: db.eventTimeslot,
      required: true,
      attributes: ["id"],
      include: {
        model: db.studentTimeslot,
        required: true,
        attributes: ["id"],
        include: [
          {
            model: db.critique,
            required: true,
            attributes: ["id", "type", "grade", "comment"],
            include: {
              model: db.userRole,
              required: true,
              attributes: ["id", "title"],
              include: {
                model: db.user,
                required: true,
                attributes: ["id", "fName", "lName"],
              },
            },
          },
          {
            model: db.studentInstrument,
            required: true,
            attributes: ["id", "studentId"],
            include: [
              {
                model: db.userRole,
                required: true,
                as: "student",
                attributes: ["id", "title"],
                include: {
                  model: db.user,
                  required: true,
                  attributes: ["id", "fName", "lName"],
                },
              },
              {
                model: db.instrument,
                required: true,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      },
    },
  })
    .then((data) => {
      let text = "[";
      //for each event
      for (let eI = 0; eI < data.length; eI++) {
        let curEvent = data[eI].dataValues;
        //for each event timeslot
        for (let etI = 0; etI < curEvent.eventTimeslots.length; etI++) {
          let curEventTs = curEvent.eventTimeslots[etI].dataValues;
          //for each student timeslot
          for (let stI = 0; stI < curEventTs.studentTimeslots.length; stI++) {
            let curStudentTs = curEventTs.studentTimeslots[stI].dataValues;
            let student =
              curStudentTs.studentInstrument.dataValues.student.dataValues;
            let critiquerArray = [];
            text +=
              '{"eventDate":"' +
              months[Number(curEvent.date.substring(5, 7) - 1)] +
              " " +
              curEvent.date.substring(8) +
              '","eventType":"' +
              curEvent.type +
              '","studentTitle":"' +
              student.title +
              '","studentFName":"' +
              student.user.dataValues.fName +
              '","studentLName":"' +
              student.user.dataValues.lName +
              '","studentInstrument":"';
            text +=
              curStudentTs.studentInstrument.dataValues.instrument.dataValues
                .name + '","critiquers":[';
            //for each critique
            for (let cI = 0; cI < curStudentTs.critiques.length; cI++) {
              let curCritique = curStudentTs.critiques[cI].dataValues;
              if (critiquerArray.length == 0) {
                text +=
                  '{"critiquerName":"' +
                  (curCritique.userRole.dataValues.title === null
                    ? ""
                    : curCritique.userRole.dataValues.title + " ") +
                  curCritique.userRole.dataValues.user.dataValues.fName +
                  " " +
                  curCritique.userRole.dataValues.user.dataValues.lName +
                  '","comments":[';
                critiquerArray.push(curCritique.userRole.dataValues.id);
              } else if (
                critiquerArray.includes(curCritique.userRole.dataValues.id)
              ) {
                //same faculty
                text += ",";
              } else {
                //new faculty
                critiquerArray.push(curCritique.userRole.dataValues.id);
                text +=
                  ']},{"critiquerName":"' +
                  (curCritique.userRole.dataValues.title === null
                    ? ""
                    : curCritique.userRole.dataValues.title + " ") +
                  curCritique.userRole.dataValues.user.dataValues.fName +
                  " " +
                  curCritique.userRole.dataValues.user.dataValues.fName +
                  '","comments":[';
              }
              text +=
                '{"critiqueTitle":"' +
                curCritique.type +
                '","critiqueComment":"' +
                curCritique.comment +
                '","critiqueGrade":"' +
                curCritique.grade +
                '"}';
            }
            text += "]}]}";
          }
          if (curEvent.eventTimeslots.length - etI > 1) {
            text += ",";
          }
        }
        if (data.length - eI > 1) {
          text += ",";
        }
      }
      text += "]";
      res.send(JSON.parse(text));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};

exports.getEventCritiquesBySemesterId = (req, res) => {
  const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  Event.findAll({
    where: {
      semesterId: { [Op.eq]: req.params.semesterId },
    },
    attributes: ["id", "date", "type"],
    include: {
      model: db.eventTimeslot,
      required: true,
      attributes: ["id"],
      include: {
        model: db.studentTimeslot,
        required: true,
        attributes: ["id"],
        include: [
          {
            model: db.critique,
            required: true,
            attributes: ["id", "type", "grade", "comment"],
            include: {
              model: db.userRole,
              required: true,
              attributes: ["id", "title"],
              include: {
                model: db.user,
                required: true,
                attributes: ["id", "fName", "lName"],
              },
            },
          },
          {
            model: db.studentInstrument,
            required: true,
            attributes: ["id", "studentId"],
            include: [
              {
                model: db.userRole,
                required: true,
                as: "student",
                attributes: ["id", "title"],
                include: {
                  model: db.user,
                  required: true,
                  attributes: ["id", "fName", "lName"],
                },
              },
              {
                model: db.instrument,
                required: true,
                attributes: ["id", "name"],
              },
            ],
          },
        ],
      },
    },
  })
    .then((data) => {
      let text = "[";
      //for each event
      for (let eI = 0; eI < data.length; eI++) {
        let curEvent = data[eI].dataValues;
        //for each event timeslot
        for (let etI = 0; etI < curEvent.eventTimeslots.length; etI++) {
          let curEventTs = curEvent.eventTimeslots[etI].dataValues;
          //for each student timeslot
          for (let stI = 0; stI < curEventTs.studentTimeslots.length; stI++) {
            let curStudentTs = curEventTs.studentTimeslots[stI].dataValues;
            let student =
              curStudentTs.studentInstrument.dataValues.student.dataValues;
            let critiquerArray = [];
            text +=
              '{"eventDate":"' +
              months[Number(curEvent.date.substring(5, 7) - 1)] +
              " " +
              curEvent.date.substring(8) +
              '","eventType":"' +
              curEvent.type +
              '","studentTitle":"' +
              student.title +
              '","studentFName":"' +
              student.user.dataValues.fName +
              '","studentLName":"' +
              student.user.dataValues.lName +
              '","studentInstrument":"';
            text +=
              curStudentTs.studentInstrument.dataValues.instrument.dataValues
                .name + '","critiquers":[';
            //for each critique
            for (let cI = 0; cI < curStudentTs.critiques.length; cI++) {
              let curCritique = curStudentTs.critiques[cI].dataValues;
              if (critiquerArray.length == 0) {
                text +=
                  '{"critiquerName":"' +
                  (curCritique.userRole.dataValues.title === null
                    ? ""
                    : curCritique.userRole.dataValues.title + " ") +
                  curCritique.userRole.dataValues.user.dataValues.fName +
                  " " +
                  curCritique.userRole.dataValues.user.dataValues.lName +
                  '","comments":[';
                critiquerArray.push(curCritique.userRole.dataValues.id);
              } else if (
                critiquerArray.includes(curCritique.userRole.dataValues.id)
              ) {
                //same faculty
                text += ",";
              } else {
                //new faculty
                critiquerArray.push(curCritique.userRole.dataValues.id);
                text +=
                  ']},{"critiquerName":"' +
                  (curCritique.userRole.dataValues.title === null
                    ? ""
                    : curCritique.userRole.dataValues.title + " ") +
                  curCritique.userRole.dataValues.user.dataValues.fName +
                  " " +
                  curCritique.userRole.dataValues.user.dataValues.fName +
                  '","comments":[';
              }
              text +=
                '{"critiqueTitle":"' +
                curCritique.type +
                '","critiqueComment":"' +
                curCritique.comment +
                '","critiqueGrade":"' +
                curCritique.grade +
                '"}';
            }
            text += "]}]}";
          }
          if (curEvent.eventTimeslots.length - etI > 1) {
            text += ",";
          }
        }
        if (data.length - eI > 1) {
          text += ",";
        }
      }
      text += "]";
      res.send(JSON.parse(text));
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving events.",
      });
    });
};
