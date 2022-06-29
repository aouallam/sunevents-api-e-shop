module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("wishList", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
  });

  Index.associate = (models) => {};

  return Index;
};
