module.exports = (sequelize, Sequelize) => {
  const JurorTimeslot = sequelize.define(
    "jurorTimeslot",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

  return JurorTimeslot;
};
