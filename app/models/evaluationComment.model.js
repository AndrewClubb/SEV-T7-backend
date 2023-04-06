module.exports = (sequelize, Sequelize) => {
  const EvaluationComment = sequelize.define("evaluationComment", {
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
    comment: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false
  });

  return EvaluationComment;
};

