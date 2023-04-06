module.exports = (sequelize, Sequelize) => {
  const Instrument = sequelize.define("instrument", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  });

  return Instrument;
};

