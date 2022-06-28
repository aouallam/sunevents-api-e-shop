module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("order", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    numOrder: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.partner);
    Index.belongsTo(models.customerOrder);
    Index.hasMany(models.orderLine);
  };

  return Index;
};
