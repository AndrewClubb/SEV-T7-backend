const db = require("../models");
const { Op } = require("sequelize");
const Repertoire = db.repertoire;

// Create and Save a new repertoire
exports.create = (req, res) => {
  // Validate request
  if (!req.body.studentInstrumentId) {
    res.status(400).send({
      message: "studentInstrumentId can not be empty!",
    });
    return;
  } else if (!req.body.songId) {
    res.status(400).send({
      message: "songId name can not be empty!",
    });
    return;
  }

  const repertoire = {
    studentInstrumentId: req.body.studentInstrumentId,
    songId: req.body.songId,
    semesterId: req.body.semesterId,
  };

  // Create and Save a new repertoire
  Repertoire.create(repertoire)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the repertoire.",
      });
    });
};

// Retrieve all repertoires from the database
exports.findAll = (req, res) => {
  Repertoire.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving repertoires.",
      });
    });
};

// Retrieve a(n) repertoire by id
exports.findById = (req, res) => {
  const id = req.params.id;
  Repertoire.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: "Cannot find repertoire with id=" + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving repertoire with id=" + id,
      });
    });
};

// Update a(n) repertoire by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  Repertoire.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Repertoire was updated successfully.",
        });
      } else {
        res.send({
          message:
            "Cannot update repertoire with id=" +
            id +
            ". Maybe the repertoire was not found or req.body is empty!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating repertoire with id=" + id,
      });
    });
};

// Delete a(n) repertoire with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Repertoire.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Repertoire was deleted successfully!",
        });
      } else {
        res.send({
          message:
            "Cannot delete repertoire with id=" +
            id +
            ". Maybe the repertoire was not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete repertoire with id=" + id,
      });
    });
};

// Delete all repertoires from the database.
exports.deleteAll = (req, res) => {
  Repertoire.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} repertoires were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all repertoires.",
      });
    });
};

exports.getStudentRepertoire = async (req, res) => {
  await Repertoire.findAll({
    include: {
      model: db.studentInstrument,
      required: true,
      include: [
        {
          model: db.userRole,
          as: "student",
          required: true,
          include: {
            model: db.user,
            required: true,
            where: {
              id: { [Op.eq]: req.params.userId },
            },
          },
        },
        { model: db.instrument, required: true },
      ],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving repertoires.",
      });
    });
};

exports.getSemesterStudentRepertoire = async (req, res) => {
  var returnData;
  await db.semester
    .findAll({
      order: [["year", "DESC"], db.Sequelize.literal(`code = 'SP' ASC`)],
      include: {
        model: db.repertoire,
        required: true,
        include: [
          {
            model: db.studentInstrument,
            required: true,
            include: [
              {
                model: db.userRole,
                as: "student",
                required: true,
                include: {
                  model: db.user,
                  required: true,
                  where: {
                    id: { [Op.eq]: req.params.userId },
                  },
                },
              },
              { model: db.instrument, required: true },
            ],
          },
          {
            model: db.song,
            required: true,
            include: {
              model: db.composer,
              required: true,
            },
          },
        ],
      },
    })
    .then((data) => {
      // res.send(data);
      returnData = data;
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving repertoires.",
      });
    });

  await Repertoire.findAll({
    where: {
      semesterId: { [Op.is]: null },
    },
    include: [
      {
        model: db.studentInstrument,
        required: true,
        include: [
          {
            model: db.userRole,
            as: "student",
            required: true,
            include: {
              model: db.user,
              required: true,
              where: {
                id: { [Op.eq]: req.params.userId },
              },
            },
          },
          { model: db.instrument, required: true },
        ],
      },
      {
        model: db.song,
        required: true,
        include: {
          model: db.composer,
          required: true,
        },
      },
    ],
  })
    .then((data) => {
      if (data.length > 0) {
        returnData.push({ id: null, repertoires: data });
      }
      res.send(returnData);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving repertoires.",
      });
    });
};
