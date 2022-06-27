module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("attribute", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    key: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.product);
  };

  return Index;
};
