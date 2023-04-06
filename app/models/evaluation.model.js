module.exports = (sequelize, Sequelize) => {
  const Evaluation = sequelize.define("evaluation", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    courseName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });

  return Evaluation;
};

