module.exports = (sequelize, Sequelize) => {
  const Index = sequelize.define("product", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    modelId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imgLink: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    priceU: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tax: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "activated",
    },
  });

  Index.associate = (models) => {
    Index.belongsTo(models.partner);
    Index.belongsToMany(models.category, {
      through: "categoryProduct",
      onDelete: "cascade",
    });
    Index.belongsToMany(models.customer, {
      through: "shoppingCart",
      onDelete: "cascade",
    });
    Index.belongsToMany(models.wishListGroup, {
      through: "wishList",
      onDelete: "cascade",
    });

    Index.hasMany(models.attribute);
  };

  return Index;
};
