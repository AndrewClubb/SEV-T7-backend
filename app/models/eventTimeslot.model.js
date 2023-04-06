module.exports = (sequelize, Sequelize) => {
  const EventTimeslot = sequelize.define("eventTimeslot", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    endTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    hasPassed: {
      type: Sequelize.BOOLEAN
    },
    isComplete: {
      type: Sequelize.BOOLEAN
    },
    isReserved: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    timestamps: false
  });

  return EventTimeslot;
};

