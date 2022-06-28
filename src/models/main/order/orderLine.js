module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("orderLine", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    priceHT: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    priceTTC: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tax: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "waiting",
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.order);
    Index.belongsTo(models.product);
  };

  return Index;
};
