module.exports = (sequelize, Sequelize) => {
  const Critique = sequelize.define(
    "critique",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      grade: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Critique;
};
