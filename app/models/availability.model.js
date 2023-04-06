module.exports = (sequelize, Sequelize) => {
  const Availability = sequelize.define("availability", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
  },
  {
    timestamps: false
  });

  return Availability;
};

