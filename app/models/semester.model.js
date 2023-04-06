module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define(
    "semester",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
      },
      endDate: {
        type: Sequelize.DATEONLY,
      },
    },
    {
      timestamps: false,
    }
  );

  return Semester;
};
