module.exports = (sequelize, Sequelize) => {
  const Repertoire = sequelize.define("repertoire", {
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

  return Repertoire;
};

