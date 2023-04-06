const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    supportBigNumbers: true,
  },
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.availability = require("./availability.model.js")(sequelize, Sequelize);
db.userRole = require("./userRole.model.js")(sequelize, Sequelize);
db.studentInstrument = require("./studentInstrument.model.js")(
  sequelize,
  Sequelize
);
db.instrument = require("./instrument.model.js")(sequelize, Sequelize);
db.studentTimeslot = require("./studentTimeslot.model.js")(
  sequelize,
  Sequelize
);
db.critique = require("./critique.model.js")(sequelize, Sequelize);
db.eventTimeslot = require("./eventTimeslot.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.semester = require("./semester.model.js")(sequelize, Sequelize);
db.composer = require("./composer.model.js")(sequelize, Sequelize);
db.song = require("./song.model.js")(sequelize, Sequelize);
db.songTranslation = require("./songTranslation.model.js")(
  sequelize,
  Sequelize
);
db.repertoire = require("./repertoire.model.js")(sequelize, Sequelize);
db.timeslotSong = require("./timeslotSong.model.js")(sequelize, Sequelize);
db.evaluation = require("./evaluation.model.js")(sequelize, Sequelize);
db.evaluationComment = require("./evaluationComment.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.jurorTimeslot = require("./jurorTimeslot.model.js")(sequelize, Sequelize);

//Availability FKs
db.user.hasMany(db.availability, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.event.hasMany(db.availability, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.availability.belongsTo(db.user);
db.availability.belongsTo(db.event);

//Critique FKs
db.studentTimeslot.hasMany(db.critique, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.jurorTimeslot.hasMany(db.critique, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.critique.belongsTo(db.studentTimeslot, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.critique.belongsTo(db.jurorTimeslot, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

//Evaluation FKs
db.userRole.hasMany(db.evaluation, {
  foreignKey: { name: "facultyId", allowNull: false },
  onDelete: "CASCADE",
});
db.studentInstrument.hasMany(db.evaluation, {
  foreignKey: { name: "studentId", allowNull: false },
  onDelete: "CASCADE",
});

db.semester.hasMany(db.evaluation, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.evaluation.belongsTo(db.userRole, {
  foreignKey: { name: "facultyId" },
});
db.evaluation.belongsTo(db.studentInstrument, {
  foreignKey: { name: "studentId" },
});
db.evaluation.belongsTo(db.semester);

//EvaluationComment FKs
db.evaluation.hasMany(db.evaluationComment, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.evaluationComment.belongsTo(db.evaluation);

//Event FKs
db.semester.hasMany(db.event, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.event.belongsTo(db.semester);

//EventTimeslot FKs
db.userRole.hasMany(db.eventTimeslot, {
  foreignKey: { name: "accompanistId" },
});
db.event.hasMany(db.eventTimeslot);

db.eventTimeslot.belongsTo(db.userRole, {
  foreignKey: { name: "accompanistId" },
});
db.eventTimeslot.belongsTo(db.event);

//Repertoire FKs
db.studentInstrument.hasMany(db.repertoire, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.song.hasMany(db.repertoire, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.semester.hasMany(db.repertoire);

db.repertoire.belongsTo(db.semester);
db.repertoire.belongsTo(db.studentInstrument);
db.repertoire.belongsTo(db.song);
db.repertoire.belongsTo(db.semester);

//Song FKs
db.composer.hasMany(db.song, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.song.belongsTo(db.composer);

//SongTranslation FKs
db.song.hasMany(db.songTranslation, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.songTranslation.belongsTo(db.song);

//StudentInstrument FKs
db.userRole.hasMany(db.studentInstrument, {
  as: "student",
  foreignKey: { name: "studentId", allowNull: false },
  onDelete: "CASCADE",
});
db.instrument.hasMany(db.studentInstrument, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.userRole.hasMany(db.studentInstrument, {
  as: "accompanist",
  foreignKey: { name: "accompanistId" },
});
db.userRole.hasMany(db.studentInstrument, {
  as: "instructor",
  foreignKey: { name: "instructorId", allowNull: false },
  onDelete: "CASCADE",
});

db.studentInstrument.belongsTo(db.userRole, { as: "student" });
db.studentInstrument.belongsTo(db.userRole, { as: "instructor" });
db.studentInstrument.belongsTo(db.userRole, { as: "accompanist" });
db.studentInstrument.belongsTo(db.instrument);

//StudentTimeslot FKs
db.studentInstrument.hasMany(db.studentTimeslot, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.eventTimeslot.hasMany(db.studentTimeslot, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.userRole.hasMany(db.studentTimeslot, {
  foreignKey: { name: "instructorId", allowNull: false },
  onDelete: "CASCADE",
});

db.studentTimeslot.belongsTo(db.studentInstrument);
db.studentTimeslot.belongsTo(db.eventTimeslot);
db.studentTimeslot.belongsTo(db.userRole, {
  foreignKey: { name: "instructorId" },
});

//TimeslotSong KFs
db.studentTimeslot.hasMany(db.timeslotSong, {
  foreignKey: { name: "timeslotId", allowNull: false },
  onDelete: "CASCADE",
});
db.song.hasMany(db.timeslotSong, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.timeslotSong.belongsTo(db.studentTimeslot, {
  foreignKey: { name: "timeslotId" },
});
db.timeslotSong.belongsTo(db.song);

//UserRole FKs
db.user.hasMany(db.userRole, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.userRole.belongsTo(db.user);

//Session FKs
db.user.hasMany(db.session, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

db.session.belongsTo(db.user);

// JurorTimeslot FKs
db.eventTimeslot.hasMany(db.jurorTimeslot, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
db.userRole.hasMany(db.jurorTimeslot, {
  foreignKey: { name: "jurorId", allowNull: false },
  onDelete: "CASCADE",
});

db.jurorTimeslot.belongsTo(db.eventTimeslot);
db.jurorTimeslot.belongsTo(db.userRole, {
  foreignKey: { name: "jurorId" },
});

module.exports = db;
