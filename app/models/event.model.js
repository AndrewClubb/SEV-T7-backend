module.exports = (sequelize, Sequelize) => {
  const Event = sequelize.define("event", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    type: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: Sequelize.TIME,
    },
    endTime: {
      type: Sequelize.TIME,
    },
    isVisible: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    canMergeSlots: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    slotDuration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false
  });

  return Event;
};

