module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("shoppingCart", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });

  Index.associate = (models) => {};

  return Index;
};
