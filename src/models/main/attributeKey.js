module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("attributeKey", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.product);
  };

  return Index;
};
