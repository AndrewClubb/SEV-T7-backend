module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define(
    "userRole",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
      },
      stuClassification: {
        type: Sequelize.STRING,
      },
      stuMajor: {
        type: Sequelize.STRING,
      },
      stuNumOfSemesters: {
        type: Sequelize.INTEGER,
      },
      stuEmailCritiqueBool: {
        type: Sequelize.BOOLEAN,
      },
      stuCompletedHearing: {
        type: Sequelize.BOOLEAN,
      },
      title: {
        type: Sequelize.STRING,
      },
      isInstructor: {
        type: Sequelize.BOOLEAN,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return UserRole;
};
