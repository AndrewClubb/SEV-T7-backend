module.exports = (sequelize, Sequelize) => {
  const Composer = sequelize.define("composer", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    fName: {
      type: Sequelize.STRING
    },
    lName: {
      type: Sequelize.STRING
    },
    nationality: {
      type: Sequelize.STRING
    },
    dateOfBirth: {
      type: Sequelize.STRING
    },
    dateOfDeath: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false
  });

  return Composer;
};

