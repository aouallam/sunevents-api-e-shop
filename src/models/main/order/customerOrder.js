module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("customerOrder", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    priceHT: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priceTTC: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.customer);
    Index.hasMany(models.order);
  };

  return Index;
};
