module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("wishListGroup", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.customer);

    Index.belongsToMany(models.product, {
      through: "wishList",
      onDelete: "cascade",
    });
  };

  return Index;
};
