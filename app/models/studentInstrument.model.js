module.exports = (sequelize, Sequelize) => {
  const StudentInstrument = sequelize.define("studentInstrument", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    level: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  });

  return StudentInstrument;
};

