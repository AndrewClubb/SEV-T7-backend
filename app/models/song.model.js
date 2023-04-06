module.exports = (sequelize, Sequelize) => {
  const Song = sequelize.define("song", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  });

  return Song;
};

