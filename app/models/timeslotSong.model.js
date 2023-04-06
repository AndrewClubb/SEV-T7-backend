module.exports = (sequelize, Sequelize) => {
  const TimeslotSong = sequelize.define("timeslotSong", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
  },
  {
    timestamps: false
  });

  return TimeslotSong;
};

