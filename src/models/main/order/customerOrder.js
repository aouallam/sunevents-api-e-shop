module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("customerOrder", {
    priceHT: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priceTTC: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {};

  return Index;
};
