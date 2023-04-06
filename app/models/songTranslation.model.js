module.exports = (sequelize, Sequelize) => {
  const SongTranslation = sequelize.define(
    "songTranslation",
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
      text: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      language: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return SongTranslation;
};
