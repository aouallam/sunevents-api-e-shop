module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("shoppingCart", {
    quantity: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {};

  return Index;
};
